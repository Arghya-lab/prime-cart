const Product = require("../models/Product");

/* CREATE */
//  create a product by seller
const createProduct = async (req, res) => {
  try {
    const { sellerId } = req.seller;
    const { name } = req.body;
    if (await Product.findOne({ name })) {
      res.status(400).json({
        success: false,
        error: "Already product available with same name.",
      });
    }
    const savedProduct = await Product.create({ sellerId, ...req.body });
    res.status(201).json({ success: true, data: savedProduct });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to create product." });
  }
};

/* READ */
//  get all relevant products
const getAllProducts = async (req, res) => {
  try {
    //  improve and optimize it
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch products." });
  }
};

//  get a product by productId
const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch product" });
  }
};

/* UPDATE */
//  update a product by seller
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { sellerId } = req.seller;
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }
    if (product.sellerId.toString() !== sellerId) {
      return res.status(401).json({
        success: false,
        error: "Please authenticate using a valid token",
      });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      { $set: req.body }, //  Update only the fields passed to $set.
      { new: true }, //  method will return the updated document.
      { runValidators: true } //  run defined validation checks on the updated data.
    );
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to update product" });
  }
};

/* DELETE */
//  delete a product by seller
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { sellerId } = req.seller;
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }
    if (product.sellerId.toString() !== sellerId) {
      return res.status(401).json({
        success: false,
        error: "Please authenticate using a valid token",
      });
    }
    const deletedProduct = await Product.findByIdAndRemove(productId);
    res.status(200).json({ success: true, data: deletedProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to delete product" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
