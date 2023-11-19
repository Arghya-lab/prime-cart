const Order = require("../models/Order");
const Product = require("../models/Product");
const Payment = require("../models/Payment");
const Address = require("../models/Address");

const createOrder = async (req, res) => {
  try {
    //  req.body = { productsInfo: [ { id, sellingPrice, quantity } ] , addressId, paymentId }
    const { customerId } = req.customer;
    const { productsInfo, addressId, paymentId } = req.body;
    const orders = await Promise.all(
      productsInfo.map(async (product) => {
        const { sellerId } = await Product.findById(product.id);
        return await Order.create({
          customerId,
          productId: product.id,
          sellerId,
          quantity: product.quantity,
          price: {
            productPrice: product.sellingPrice,
            deliveryCharge: product.sellingPrice > 500 ? 0 : 40,
          },
          paymentId,
          shippingAddressId: addressId,
        });
      })
    );
    res.status(201).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to create order.",
    });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const { customerId } = req.customer;
    const { page = 1, limit = 5 } = req.query;
    const orders = await Order.find({ customerId })
      .sort({ createdAt: -1 })
      .select("productId quantity price createdAt")
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
    const products = await Promise.all(
      orders.map(async (info) => {
        const productDetails = await Product.findById(info.productId).lean();
        return {
          _id: info._id,
          productId: info.productId,
          name: productDetails.name,
          imgUrls: productDetails.imgUrls,
          quantity: info.quantity,
          price: info.price,
          orderPlacedTime: info.createdAt,
        };
      })
    );
    const totalProducts = await Order.find({ customerId }).countDocuments();
    res.status(201).json({ success: true, data: { products, totalProducts } });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error occurred while fetching orders.",
    });
  }
};

const getSellerOrders = async (req, res) => {
  try {
    const { sellerId } = req.seller;
    const { page = 1, limit = 5 } = req.query;
    const data = await Order.find({ sellerId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
    const orders = await Promise.all(
      data.map(async (order) => {
        const product = await Product.findById(order.productId).lean();
        const payment = await Payment.findById(order.paymentId).lean();
        return {
          _id: order._id,
          product: {
            productId: product._id,
            name: product.name,
            imgUrls: product.imgUrls,
          },
          quantity: order.quantity,
          price: order.price,
          status: order.orderStatus,
          paymentType: payment.type,
          orderPlacedTime: order.createdAt,
        };
      })
    );
    const totalOrders = await Order.find({ sellerId }).countDocuments();
    res.status(200).json({ success: true, data: { orders, totalOrders } });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error occurred while fetching orders.",
    });
  }
};

//  get sales statistics by seller
const getSalesStatistics = async (req, res) => {
  try {
    const { sellerId } = req.seller;
    const ordersInfo = await Order.find({ sellerId });
    // data: {
    //   ordersStatusCount: {
    //     processing,
    //     confirmed,
    //     shipping,
    //     delivered,
    //     canceled,
    //   },
    //   salesAndRevenue: {
    //     productId: {
    //       product: { name, category, imgs },
    //       totalSalesNo,
    //       totalRevenue,
    //       totalCanceled,
    //     },
    //   },
    // }
    let ordersStatusCount = {
      processing: 0,
      confirmed: 0,
      shipping: 0,
      delivered: 0,
      canceled: 0,
    };
    ordersInfo.forEach((order) => {
      if (ordersStatusCount[order.orderStatus]) {
        ordersStatusCount[order.orderStatus]++;
      } else {
        ordersStatusCount[order.orderStatus] = 1;
      }
    });
    const salesAndRevenue = {};
    await Promise.all(
      ordersInfo.forEach(async (order) => {
        if (salesAndRevenue[order.productId]) {
          if (order.orderStatus === "canceled") {
            salesAndRevenue[order.productId] = {
              ...salesAndRevenue[order.productId],
              totalCanceled: salesAndRevenue[order.productId].totalCanceled + 1,
            };
          } else {
            salesAndRevenue[order.productId] = {
              ...salesAndRevenue[order.productId],
              totalSalesNo:
                salesAndRevenue[order.productId].totalSalesNo + order.quantity,
              totalRevenue:
                salesAndRevenue[order.productId].totalRevenue +
                order.price.productPrice,
            };
          }
        } else {
          salesAndRevenue[order.productId] = {
            product: await Product.findById(order.productId)
              .select("name category imgUrls")
              .lean(),
            totalSalesNo: order.orderStatus === "canceled" ? 0 : order.quantity,
            totalRevenue:
              order.orderStatus === "canceled" ? 0 : order.price.productPrice,
            totalCanceled: order.orderStatus === "canceled" ? 1 : 0,
          };
        }
      })
    );

    res
      .status(200)
      .json({ success: true, data: { ordersStatusCount, salesAndRevenue } });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch statistics" });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { customerId } = req.customer;
    const { orderId } = req.params;
    const orderInfo = await Order.findById(orderId);
    if (customerId !== orderInfo.customerId.toString()) {
      return res.status(401).json({
        success: false,
        error: "Please authenticate using a valid token",
      });
    }
    const paymentInfo = await Payment.findOne({
      _id: orderInfo.paymentId,
      customerId,
    });
    const shippingAddressInfo = await Address.findOne({
      _id: orderInfo.shippingAddressId,
      customerId,
    }).select("fullName pinCode landmark area city state");
    const productDetails = await Product.findById(orderInfo.productId);
    res.status(201).json({
      success: true,
      data: {
        _id: orderInfo._id,
        productId: orderInfo.productId,
        name: productDetails.name,
        imgUrl: productDetails.imgUrls[0],
        quantity: orderInfo.quantity,
        price: orderInfo.price,
        paymentType: paymentInfo.type,
        shippingAddress: shippingAddressInfo,
        orderPlacedTime: orderInfo.createdAt,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch order detail.",
    });
  }
};

const CancelOrder = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to cancel order.",
    });
  }
};

const confirmOrdersBySeller = async (req, res) => {
  try {
    const { sellerId } = req.seller;
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (sellerId !== order.sellerId.toString()) {
      return res.status(401).json({
        success: false,
        error: "Please authenticate using a valid token",
      });
    }
    const data = await Order.findOneAndUpdate(
      { _id: orderId, sellerId },
      { orderStatus: "confirmed" },
      { new: true },
      { runValidators: true }
    );
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to confirm order.",
    });
  }
};

module.exports = {
  createOrder,
  getAllOrder,
  getSellerOrders,
  getSalesStatistics,
  getOrderDetails,
  CancelOrder,
  confirmOrdersBySeller,
};
