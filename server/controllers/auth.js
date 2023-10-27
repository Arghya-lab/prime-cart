require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Seller = require("../models/Seller");
const Customer = require("../models/Customer");

const jwtSecret = process.env.JWT_SECRET;

const signupUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (await Customer.findOne({ email })) {
      return res.status(400).json({ success: false, error: "Customer already present" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const customer = Customer.create({
      firstName,
      lastName,
      email,
      password: hash,
    });
    const token = jwt.sign(
      { customerId: customer._id, iat: Math.floor(Date.now() / 1000) - 30 },
      jwtSecret
    );
    res.status(201).json({
      success: true,
      data: {
        name: `${firstName} ${lastName}`,
        email,
        token: `Bearer ${token}`,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to signup." });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials." });
    }
    if (!bcrypt.compareSync(password, customer.password)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials." });
    }
    const token = jwt.sign(
      { customerId: customer._id, iat: Math.floor(Date.now() / 1000) - 30 },
      jwtSecret
    );
    res.status(200).json({
      success: true,
      data: {
        name: `${customer.firstName} ${customer.lastName}`,
        email,
        token: `Bearer ${token}`,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to login." });
  }
};

const createSeller = async (req, res) => {
  try {
    const { customerId } = req.customer;
    if (!await Customer.findById(customerId)) {
      return res.status(400).json({ success: false, error: "Failed to create seller." });
    }
    if (await Seller.findOne({ customerId })) {
      return res.status(400).json({ success: false, error: "You are already a seller." });
    }
    const { customerSupportEmail, panNo, location } = req.body;
    const seller = await Seller.create({
      customerId,
      customerSupportEmail,
      panNo,
      location,
    });
    await Customer.findByIdAndUpdate(customerId, { isSeller: true });
    const sellerToken = jwt.sign(
      { sellerId: seller._id, iat: Math.floor(Date.now() / 1000) - 30 },
      jwtSecret
    );
    res.status(200).json({
      success: true,
      data: {
        sellerToken: `Bearer ${sellerToken}`,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to create seller." });
  }
};

const getSellerToken = async (req, res) => {
  try {
    const { customerId } = req.customer;
    const customer = await Customer.findById(customerId)
    if (!customer) {
      return res.status(400).json({ success: false, error: "You are not a seller." });
    }
    if (customer.isSeller !== true) {
      return res.status(400).json({ success: false, error: "You are not a seller." });
    }
    const seller = await Seller.findOne({customerId})
    const sellerToken = jwt.sign(
      { sellerId: seller._id, iat: Math.floor(Date.now() / 1000) - 30 },
      jwtSecret
    );
    res.status(200).json({
      success: true,
      data: {
        sellerToken: `Bearer ${sellerToken}`,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to get seller info." });
  }

}

module.exports = { signupUser, loginUser, createSeller, getSellerToken };
