const Product = require("../models/Product")


const getAllProducts = async(req, res)=>{
  try {
    const products = await Product.find()
    res.json({ success: true, data: products })
  } catch (error) {
    res.json({ success: false, error})
  }
}


module.exports = { getAllProducts }