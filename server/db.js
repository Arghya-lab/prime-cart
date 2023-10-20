require("dotenv").config();
const mongoose = require("mongoose");

const mongoUri = process.env.MONGO_URI;
mongoose.set("strictQuery", true);

const connectToDb = async () => {
  try {
    mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Mongodb.");
  } catch (error) {
    console.error("Error while connecting to MongoDB: ", error.message);
  }
};

module.exports = connectToDb;
