const express = require("express");
const fetchCustomer = require("../middleware/fetchCustomer");
const {
  createOrder,
  getAllOrder,
  CancelOrder
} = require("../controllers/order");

const router = express.Router();

// Create a order of a customer using : POST /api/orders  =>  require token
router.post("/", fetchCustomer, createOrder);
// Get all orders of a customer using : GET /api/orders  =>  require token
router.get("/", fetchCustomer, getAllOrder);
// Cancel a order of a customer using : GET /api/orders  =>  require token
router.get("/cancel/:id", fetchCustomer, CancelOrder);

module.exports = router;
