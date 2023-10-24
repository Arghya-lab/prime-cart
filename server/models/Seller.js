const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      unique: true,
    },
    customerSupportEmail: {
      type: "String",
      required: true,
    },
    panNo: {
      type: String,
      required: true,
    },
    location: {
      type: "String",
      required: true,
    },
    products: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Product",
    },
  },
  { timestamps: true }
);

const Seller = mongoose.model("Seller", sellerSchema);
module.exports = Seller;
