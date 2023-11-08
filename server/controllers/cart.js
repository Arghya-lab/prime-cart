const Cart = require("../models/Cart");
const Product = require("../models/Product");

const addProductToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const { customerId } = req.customer;
    const cart = await Cart.findOne({ customerId });
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
        { $push: { products: { productId } } },
        { new: true }
      );
      return res.status(200).json({ success: true, data: updatedCart });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Error while adding product to cart.",
    });
  }
};

const getCartProducts = async (req, res) => {
  try {
    const { customerId } = req.customer;
    const cart = await Cart.findOne({ customerId });
    // If the customer doesn't have a cart
    if (!cart) {
      return res.status(200).json({ success: true, data: [] });
    }
    // Fetch detailed product info present in the cart
    const cartProductData = await Promise.all(
      cart.products.map(async (product) => {
        const { productId, quantity } = product;
        const { _id, name, imgUrls, price } = await Product.findById(productId);
        return { productId: _id, name, imgUrls, price, quantity };
      })
    );
    return res.status(200).json({ success: true, data: cartProductData });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Error while fetching cart products.",
    });
  }
};

const updateProductQuantity = async (req, res) => {
  try {
    const { customerId } = req.customer;
    const { productId } = req.params;
    const { quantity } = req.body;
    const updatedCart = await Cart.findOneAndUpdate(
      { customerId, "products.productId": productId },
      { "products.$.quantity": quantity },
      { new: true }
    );
    return res.status(200).json({ success: true, data: updatedCart });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error while updating product quantity.",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { customerId } = req.customer;
    const { productId } = req.params;
    const updatedCart = await Cart.findOneAndUpdate(
      { customerId },
      { $pull: { products: { productId } } },
      { new: true }
    );
    return res.status(200).json({ success: true, data: updatedCart.products });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error while deleting product.",
    });
  }
};

module.exports = {
  addProductToCart,
  getCartProducts,
  updateProductQuantity,
  deleteProduct,
};
