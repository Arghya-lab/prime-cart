const express = require("express")
const fetchCustomer = require("../middleware/fetchCustomer")
const { addToWishList, removeFromWishList } = require("../controllers/wishList")

const router = express.Router()

// createSeller using : POST api/wishList/:productId  =>  require token
router.post("/:productId", fetchCustomer, addToWishList)
// createSeller using : DELETE api/wishList/:productId  =>  require token
router.delete("/:productId", fetchCustomer, removeFromWishList)

module.exports = router