const express = require("express");
const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const fetchSeller = require("../middleware/fetchSeller");

const router = express.Router();

/* CREATE */
// create a Product using : POST /api/products/create =>  Seller Token require
router.post("/create", fetchSeller, createProduct);

/* READ */
// get all Products using : GET /api/products
router.get("/", getAllProducts);
// get a Product using : GET /api/products/:productId
router.get("/:productId", getProductById);

/* UPDATE */
router.patch("/:productId", fetchSeller, updateProduct);

/* DELETE */
// delete a Product using : DELETE /api/products/:productId =>  Seller Token require
router.delete("/:productId", fetchSeller, deleteProduct);

module.exports = router;
