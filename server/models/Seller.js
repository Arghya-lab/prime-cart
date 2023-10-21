const mongoose = require("mongoose")

const sellerSchema = mongoose.Schema({
  name: {
    type: "String",
    required: true,
  },
  email: {
    type: "String",
    required: true,
    unique: true,
  },
  password: {
    type: "String",
    required: true,
  },
  location: {
    type: "String",
    required: true,
  },
  products: {
    type: [ mongoose.Schema.Types.ObjectId ],
    ref: "Product",
  }
}, {timestamps: true})

const Seller = mongoose.model("Seller", sellerSchema)
module.exports = Seller