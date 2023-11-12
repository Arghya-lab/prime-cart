const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    //  req.body = { productsInfo: [ { id, sellingPrice, quantity } ] , addressId, paymentId }
    const { customerId } = req.customer;
    const { productsInfo, addressId, paymentId } = req.body;
    const orders = await Promise.all(productsInfo.map(async product=>await Order.create({
      customerId,
      productId: product.id,
      quantity: product.quantity,
      totalPrice: product.sellingPrice,
      paymentId,
      shippingAddressId: addressId
    })))
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
