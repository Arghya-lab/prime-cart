const express = require("express")
const fetchCustomer = require("../middleware/fetchCustomer")
const { addItemToCart } = require("../controllers/cart")

const router = express.Router()

// Create or add item to Cart using : POST /api/cart  =>  require token
router.post("/", fetchCustomer, addItemToCart)

module.exports = router