const express = require("express");
const fetchCustomer = require("../middleware/fetchCustomer");
const {
  createOrder,
  getAllOrder,
  getSellerOrders,
  getSalesStatistics,
  getOrderDetails,
  CancelOrder,
  confirmOrdersBySeller,
} = require("../controllers/order");
const fetchSeller = require("../middleware/fetchSeller");

const router = express.Router();

/* CREATE */
// Create an order of a customer using : POST /api/orders  =>  require token
router.post("/", fetchCustomer, createOrder);

/* READ */
// Get all orders of a customer using : GET /api/orders  =>  require token  *
router.get("/", fetchCustomer, getAllOrder);
// Get all orders of a seller using : GET /api/orders/seller  =>  Seller Token require
router.get("/seller", fetchSeller, getSellerOrders);
// Get sales statistics of products a seller : GET /api/orders/statistics =>  Seller Token require
router.get("/statistics", fetchSeller, getSalesStatistics);
// Get all order details of a order using : GET /api/orders/:orderId  =>  require token
router.get("/:orderId", fetchCustomer, getOrderDetails);

/* UPDATE */
// Cancel a order of a customer using : PATCH /api/orders  =>  require token
router.patch("/cancel/:orderId", fetchCustomer, CancelOrder);
// confirm an orders by seller using : PATCH /api/orders/confirm  =>  Seller Token require
router.patch("/confirm/:orderId", fetchSeller, confirmOrdersBySeller);

module.exports = router;
