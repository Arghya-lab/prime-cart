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
      productsInfo.map(
        async (product) =>
          await Order.create({
            customerId,
            productId: product.id,
            quantity: product.quantity,
            totalPrice: product.sellingPrice,
            paymentId,
            shippingAddressId: addressId,
          })
      )
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
      .select("productId quantity totalPrice createdAt")
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
          totalPrice: info.totalPrice,
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
        price: orderInfo.totalPrice,
        //add delivery charges
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
      error: "Failed to cancel orders.",
    });
  }
};

module.exports = {
  createOrder,
  getAllOrder,
  getOrderDetails,
  CancelOrder,
};
