const express = require("express")
const { getAllProducts, createProduct, getProductById } = require("../controllers/product")
const fetchSeller = require("../middleware/fetchSeller")

const router = express.Router()

/* CREATE */
// create a Product using : POST /api/products/create =>  Seller Token require
router.post("/create", fetchSeller, createProduct)

/* READ */
// get all Products using : GET /api/products
router.get("/", getAllProducts)
// get a Product using : GET /api/products/:productId
router.get("/:productId", getProductById)

/* UPDATE */

/* DELETE */


module.exports = router