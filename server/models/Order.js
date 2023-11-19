const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
    variantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product.variant",
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    price: {
      type: {
        productPrice: {
          type: Number,
          required: true,
        },
        deliveryCharge: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    },
    orderStatus: {
      type: String,
      enum: ["processing", "confirmed", "shipping", "delivered", "canceled"],
      default: "processing",
    },
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
    },
    shippingAddressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
