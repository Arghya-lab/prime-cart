const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

const fetchCustomer = (req, res, next) => {
  try {
    const authorization = req.header("Authorization");
    const token = authorization.split("Bearer ")[1];
    if (!token) {
      res
        .status(401)
        .send({ error: "Please authenticate using a valid token" });
    }

    const customer = jwt.verify(token, jwtSecret);
    req.customer = customer;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchCustomer;
