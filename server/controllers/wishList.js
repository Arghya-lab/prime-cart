const Customer = require("../models/Customer");
const Product = require("../models/Product");

const getWishListProducts = async (req, res) => {
  try {
    const { customerId } = req.customer;
    const { wishList } = await Customer.findById(customerId);
    if (!wishList) {
      return res
        .status(404)
        .json({ success: false, error: "Customer not found." });
    }
    const wishListProducts = await Promise.all(
      wishList.map((id) =>
        Product.findById(id).select("_id name imgUrls rating ratingCount price")
      )
    );

    res.status(200).json({ success: true, data: wishListProducts });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error while fetching wish list.",
    });
  }
};

const addToWishList = async (req, res) => {
  try {
    const { customerId } = req.customer;
    const { productId } = req.params;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, error: "Customer not found." });
    }
    customer.wishList.push(productId);
    await customer.save();
    res.status(200).json({ success: true, data: customer.wishList });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error while adding product to wish list.",
    });
  }
};

const removeFromWishList = async (req, res) => {
  try {
    const { customerId } = req.customer;
    const { productId } = req.params;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, error: "Customer not found." });
    }
    const idx = customer.wishList.indexOf(productId);
    if (idx === -1) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found in wish list." });
    }
    customer.wishList.splice(idx, 1);
    await customer.save();
    res.status(200).json({ success: true, data: customer.wishList });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error while adding product to wish list.",
    });
  }
};

module.exports = { getWishListProducts, addToWishList, removeFromWishList };
