const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    landmark: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      enum: [
        "andamanAndNicobarIslands",
        "andhraPradesh",
        "arunachalPradesh",
        "assam",
        "bihar",
        "chandigarh",
        "chhattisgarh",
        "dadraAndNagarHaveli",
        "damanAndDiu",
        "delhi",
        "goa",
        "gujarat",
        "haryana",
        "himachalPradesh",
        "jharkhand",
        "karnataka",
        "kerala",
        "lakshadweep",
        "madhyaPradesh",
        "maharashtra",
        "manipur",
        "meghalaya",
        "mizoram",
        "nagaland",
        "odisha",
        "puducherry",
        "punjab",
        "rajasthan",
        "sikkim",
        "tamilNadu",
        "telangana",
        "tripura",
        "uttarPradesh",
        "uttarakhand",
        "westBengal",
      ],
      required: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;
