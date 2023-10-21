require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDb = require("./db");
const productsRoutes = require("./routes/product")

const app = express();
const port = process.env.PORT;

/* CONFIG */
app.use(cors());
app.use(express.json());

/* CONNECT WITH DB */
connectToDb();

/* ROUTES */
app.get("/test", (req, res) => res.send("Hi"));
app.use("/api/products", productsRoutes)

/* START SERVER */
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
