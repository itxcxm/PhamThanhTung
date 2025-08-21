const mongoose = require('mongoose');

const cartsSchema = new mongoose.Schema({
    user: String,
    slug: String,          
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }


})

module.exports = mongoose.model("carts", cartsSchema)