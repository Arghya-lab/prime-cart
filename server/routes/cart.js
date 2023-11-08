const express = require("express");
const fetchCustomer = require("../middleware/fetchCustomer");
const {
  addProductToCart,
  getCartProducts,
  updateProductQuantity,
  deleteProduct,
} = require("../controllers/cart");

const router = express.Router();

// Create or add product to Cart using : POST /api/cart  =>  require token
router.post("/", fetchCustomer, addProductToCart);
// get product to Cart using : GET /api/cart  =>  require token
router.get("/", fetchCustomer, getCartProducts);
// update product Qty using : PUT /api/cart/:productId  =>  require token
router.put("/:productId", fetchCustomer, updateProductQuantity);
// update product Qty using : DELETE /api/cart/:productId  =>  require token
router.delete("/:productId", fetchCustomer, deleteProduct);

module.exports = router;
