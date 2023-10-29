const express = require("express");
const multer  = require('multer')
const {
  getCategoryProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const fetchSeller = require("../middleware/fetchSeller");

const router = express.Router();

// multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/assets/productImgs")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage })

/* CREATE */
// create a Product using : POST /api/products/create =>  Seller Token require
router.post("/create", upload.array('productImgs', 10), fetchSeller, createProduct);

/* READ */
// get all Products using : GET /api/products/:category
router.get("/:category", getCategoryProducts);
// get a Product using : GET /api/products/:productId
router.get("/:productId", getProductById);

/* UPDATE */
router.patch("/:productId", fetchSeller, updateProduct);

/* DELETE */
// delete a Product using : DELETE /api/products/:productId =>  Seller Token require
router.delete("/:productId", fetchSeller, deleteProduct);

module.exports = router;
