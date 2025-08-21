const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    slug: {type:String, unique:true},  // unique
    sku: String,       // mã sản phẩm
    category: {
        name: String
    },
    brand: String,
    description: String,
    specifications:{
        cpu: String, 
        ram: String,
        storage: String,
        screen: String, 
        gpu: String, 
        battery: String, 
        os: String, 
        processor: String, 
        camera: String 
    },  // thông số kỹ thuật
    price: Number,
    discountPrice: Number,
    quantity: Number,
    status: String,    // "in_stock", "out_of_stock"
    isFeatured: Boolean,
    images: [
        {
            path: String,
            isMain: {type: Boolean, default:true }
        }
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("products", productSchema)