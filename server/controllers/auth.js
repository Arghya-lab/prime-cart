require("dotenv").config();
const Customer = require("../models/Customer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Seller = require("../models/Seller");

const jwtSecret = process.env.JWT_SECRET;

const signupUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (await Customer.findOne({ email })) {
      return res.status(400).json({ error: "Customer already present" });
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
    res.status(400).json({ error: "Server error." });
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
    res.status(400).json({ error: "Server error." });
  }
};

const createSeller = async (req, res) => {
  try {
    const { customerId } = req.customer;
    if (await Customer.findOne({ customerId })) {
      return res.status(400).json({ error: "Seller already present" });
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
    res.status(400).json({ error: "Server error." });
  }
};

module.exports = { signupUser, loginUser, createSeller };
