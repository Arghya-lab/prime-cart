const express = require("express");
const { signupUser, loginUser, createSeller, getSellerToken } = require("../controllers/auth");
const fetchCustomer = require("../middleware/fetchCustomer");

const router = express.Router();

// signup using : POST api/auth/signup
router.post("/signup", signupUser);
// login using : POST api/auth/login
router.post("/login", loginUser);
// createSeller using : POST api/auth/createSeller  =>  require token
router.post("/createSeller", fetchCustomer, createSeller);
// getSeller using : POST api/auth/getSellerToken  =>  require token
router.get("/getSellerToken", fetchCustomer, getSellerToken);

module.exports = router;
