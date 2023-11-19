const express = require("express");
const multer = require("multer");
const {
  createProduct,
  getSearchProducts,
  getCategoryProducts,
  getProductById,
  getSellerProducts,
  updateProduct,
  addStock,
  deleteProduct,
} = require("../controllers/product");
const fetchSeller = require("../middleware/fetchSeller");

const router = express.Router();

// multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/assets/productImgs");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* CREATE */
// create a Product using : POST /api/products/create =>  Seller Token require
router.post(
  "/create",
  upload.array("productImgs", 10),
  fetchSeller,
  createProduct
);

/* READ */
// get all search Products using : GET /api/products
router.get("/", getSearchProducts);
// get all category Products using : GET /api/products/category/:category
router.get("/category/:category", getCategoryProducts);
// Get all products of a seller : GET /api/products/seller =>  Seller Token require
router.get("/seller", fetchSeller, getSellerProducts);
// get a Product using : GET /api/products/:productId
router.get("/:productId", getProductById);

/* UPDATE */
// update a Product using : PATCH /api/products/:productId =>  Seller Token require
router.patch("/:productId", fetchSeller, updateProduct);
// add new stocks of a product by seller : PATCH /api/products/addStock/:productId =>  Seller Token require
router.patch("/addStock/:productId", fetchSeller, addStock);

/* DELETE */
// delete a Product using : DELETE /api/products/:productId =>  Seller Token require
router.delete("/:productId", fetchSeller, deleteProduct);

module.exports = router;
