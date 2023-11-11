const express = require("express");
const fetchCustomer = require("../middleware/fetchCustomer");
const {
  createAddress,
  getAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
} = require("../controllers/address");

const router = express.Router();

// Create a new address using : POST /api/address  =>  require token
router.post("/", fetchCustomer, createAddress);
// get all address of a customer using : GET /api/address  =>  require token
router.get("/", fetchCustomer, getAddresses);
// get all address of a customer using : GET /api/address/:addressId  =>  require token
router.get("/:addressId", fetchCustomer, getAddressById);
// update an address using : PUT /api/address/:addressId  =>  require token
router.put("/:addressId", fetchCustomer, updateAddress);
// delete an address using : DELETE /api/address/:addressId  =>  require token
router.delete("/:addressId", fetchCustomer, deleteAddress);

module.exports = router;
