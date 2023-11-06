const Cart = require("../models/Cart");

const addItemToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const { customerId } = req.customer;
    const cart = await Cart.findOne({
      customerId,
    });
    // If the customer doesn't have a cart, create one
    if (!cart) {
      await Cart.create({ customerId });
    }
    // check for if the product already in cart
    const productExist = await Cart.findOne({
      customerId,
      "products.productId": productId,
    });
    if (productExist) {
      return res.status(200).json({ success: true, data: cart });
    } else {
      const updatedCart = await Cart.findOneAndUpdate(
        { customerId },
        {
          $push: {
            products: { productId },
          },
        },
        { new: true }
      );
      return res.status(200).json({ success: true, data: updatedCart });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error while adding product to cart.",
    });
  }
};

module.exports = { addItemToCart };
