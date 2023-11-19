const Product = require("../models/Product");

/* CREATE */
//  create a product by seller
const createProduct = async (req, res) => {
  try {
    const { sellerId } = req.seller;
    let {
      name,
      category,
      variant,
      mrp,
      selling,
      description,
      highlights,
      stock,
      productImgsName,
    } = req.body;
    if (await Product.findOne({ name })) {
      res.status(400).json({
        success: false,
        error: "Already product available with same name.",
      });
    }
    const imgUrls = productImgsName.split(",");
    highlights = highlights.split("\n");
    const savedProduct = await Product.create({
      sellerId,
      name,
      category,
      variant,
      price: { mrp, selling },
      description,
      highlights,
      stock,
      imgUrls,
    });
    res.status(201).json({ success: true, data: savedProduct });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, error: "Failed to create product." });
  }
};

/* READ */
//  get search products
const getSearchProducts = async (req, res) => {
  try {
    //  add pagination
    const { page = 1, limit = 15, query } = req.query;
    //  $or operator allows you to specify multiple conditions and returns documents that match any of the specified conditions.
    //  $regex is a regular expression pattern match.
    //  ($options: 'i') performing a case-insensitive search
    const match = {
      $or: [
        { category: { $regex: query, $options: "i" } },
        { name: { $regex: query, $options: "i" } },
      ],
    };
    const products = await Product.find(match)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(); // for read-only operations
    const totalProducts = await Product.find(match).countDocuments();
    res.status(200).json({ success: true, data: { products, totalProducts } });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch products." });
    console.log(error);
  }
};

//  get relevant Category products
const getCategoryProducts = async (req, res) => {
  try {
    const { category } = req.params;
    const {
      page = 1,
      limit = 15,
      rating = null,
      minPrice = null,
      maxPrice = null,
    } = req.query;

    let query = { category };
    if (rating !== null) {
      query.rating = { $gte: rating };
    }
    if (minPrice !== null || maxPrice !== null) {
      query["price.selling"] = {}; // Specify that 'price.selling' is an object
    }
    if (minPrice !== null) {
      query["price.selling"].$gte = minPrice;
    }
    if (maxPrice !== null) {
      query["price.selling"].$lte = maxPrice;
    }
    const products = await Product.find(query)
      .select("_id name imgUrls rating ratingCount price")
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
    const totalProducts = await Product.find(query).countDocuments();

    res.status(200).json({ success: true, data: { products, totalProducts } });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch products." });
    console.log(error);
  }
};

//  get Seller Products
const getSellerProducts = async (req, res) => {
  try {
    const { sellerId } = req.seller;
    const { page = 1, limit = 15 } = req.query;
    const products = await Product.find({ sellerId })
      .select("-sellerId -description -highlights")
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
    const totalProducts = await Product.find({ sellerId }).countDocuments();
    res.status(200).json({ success: true, data: { products, totalProducts } });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch products" });
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

//  add stock of a product by seller
const addStock = async (req, res) => {
  try {
    const { productId } = req.params;
    const { sellerId } = req.seller;
    const { addedStock } = req.body;
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
      { productId },
      { $set: { stock: product.stock + addedStock } }, //  Update only the fields passed to $set.
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
  getSearchProducts,
  getCategoryProducts,
  getProductById,
  getSellerProducts,
  updateProduct,
  addStock,
  deleteProduct,
};
