const Product = require("../models/Product");

/* CREATE */
//  create a product by seller
const createProduct = async (req, res) => {
  try {
    const { sellerId } = req.seller;
    const newProduct = new Product({ sellerId, ...req.body });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.json({ success: false, error: "Failed to create product" });
  }
};

/* READ */
//  get all relevant products 
const getAllProducts = async (req, res) => {
  try {
    //  improve and optimize it
    const products = await Product.find();
    res.json({ success: true, data: products });
  } catch (error) {
    res.json({ success: false, error });
  }
};

//  get a product by productId
const getProductById = async (req, res) => {
    try {
        const { productId } = req.params
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch product' });
    }
};

module.exports = { createProduct, getAllProducts, getProductById };
