const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

const fetchSeller = (req, res, next) => {
  try {
    const sellerAuthorization = req.header("seller-auth");
    const token = sellerAuthorization.split("Bearer ")[1];
    if (!token) {
      res
        .status(401)
        .json({ success: false, error: "Please authenticate using a valid token" });
    }

    const seller = jwt.verify(token, jwtSecret);
    req.seller = seller;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchSeller;