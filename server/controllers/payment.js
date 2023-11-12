const Payment = require("../models/Payment");

const processPayment = async (req, res) => {
  try {
    const { customerId } = req.customer;
    const { type } = req.body;
    const newPayment = await Payment.create({
      customerId,
      type,
    });
    res.status(201).json({ success: true, data: newPayment });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed white processing payment." });
  }
};

module.exports = {
  processPayment,
};
