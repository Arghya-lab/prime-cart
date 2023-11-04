const Customer = require("../models/Customer");

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

module.exports = { addToWishList, removeFromWishList };
