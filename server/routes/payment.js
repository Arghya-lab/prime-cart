const express = require("express");
const fetchCustomer = require("../middleware/fetchCustomer");
const {
  processPayment
} = require("../controllers/payment");

const router = express.Router();

// process payment using : POST /api/payment  =>  require token
router.post("/", fetchCustomer, processPayment);

module.exports = router;
