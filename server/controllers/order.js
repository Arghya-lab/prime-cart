const Order = require("../models/Order");
const Product = require("../models/Product");

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
    const data = await Order.find({ customerId })
      .sort({ createdAt: -1 })
      .select("productId quantity totalPrice createdAt");
    const orders = await Promise.all(
      data.map(async (info) => {
        const productDetails = await Product.findById(info.productId);
        return {
          _id: info._id,
          productId: info.productId,
          name: productDetails.name,
          imgUrls: productDetails.imgUrls,
          quantity: info.quantity,
          totalPrice: info.totalPrice,
          orderPlacedTime: info.createdAt,
        }
      })
    );
    res.status(201).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error occurred while fetching orders.",
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
  CancelOrder,
};
