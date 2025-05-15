const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String, //tên sản phẩm
    price: String, //giá tiền
    category: String, // loại sản phẩm
    quantity: String, // số lượng
    company: String,// Hãng
})

module.exports = mongoose.model("products", productSchema)