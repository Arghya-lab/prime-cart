require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDb = require("./db");
const productsRoutes = require("./routes/product");
const authRoutes = require("./routes/auth");
const wishListRoutes = require("./routes/wishList");
const cartRoutes = require("./routes/cart");

const app = express();
const port = process.env.PORT;

/* CONFIG */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true})); // To receive image
app.use("/assets", express.static(__dirname + "/public/assets")); // To serve static files from a directory named "public/assets

/* CONNECT WITH DB */
connectToDb();

/* ROUTES */
//  Products
app.use("/api/products", productsRoutes);
//  Auth
app.use("/api/auth", authRoutes);
//  WishList
app.use("/api/wishList", wishListRoutes);
//  cart
app.use('/api/cart', cartRoutes);

/* START SERVER */
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
