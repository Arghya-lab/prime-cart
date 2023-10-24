const express = require("express");
const { signupUser, loginUser, createSeller } = require("../controllers/auth");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// signup using : POST api/auth/signup
router.post("/signup", signupUser);
// login using : POST api/auth/login
router.post("/login", loginUser);
// createSeller using : POST api/auth/createSeller  =>  require token
router.post("/createSeller", authMiddleware, createSeller);

module.exports = router;
