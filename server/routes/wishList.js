const express = require("express")
const fetchCustomer = require("../middleware/fetchCustomer")
const { getWishListProducts, addToWishList, removeFromWishList } = require("../controllers/wishList")

const router = express.Router()

// get Wishlist using : GET api/wishList/products  =>  require token
router.get("/products", fetchCustomer, getWishListProducts)
// add a product to wishlist using : POST api/wishList/:productId  =>  require token
router.post("/:productId", fetchCustomer, addToWishList)
// remove a product from wishlist using : DELETE api/wishList/:productId  =>  require token
router.delete("/:productId", fetchCustomer, removeFromWishList)

module.exports = router