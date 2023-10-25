const mongoose = require("mongoose");

const ProductVariant = new mongoose.Schema({
  color: String,
  size: String,
  ram: String,
  rom: String,
  price: {
    type: {
      mrp: Number,
      selling: Number,
    },
  },
  stock: {
    type: Number,
    required: true,
  },
  imgUrls: {
    type: [String],
    required: true,
  },
});

const productSchema = new mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    variant: {
      type: [ProductVariant],
      default: null,
    },
    price: {
      type: {
        mrp: Number,
        selling: Number,
      },
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    highlights: {
      type: [String],
      default: null,
    },
    stock: {
      type: Number,
      required: true,
    },
    imgUrls: {
      type: [String],
      required: true,
    },
    rating: {
      type: Number,
      // assign random rating between 1 and 5
      default: Math.floor(Math.random() * 40) / 10 + 1,
    },
    ratingCount: {
      type: Number,
      // assign random rating count between 100 and 50000
      default: Math.floor(Math.random() * 50000) + 100,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
