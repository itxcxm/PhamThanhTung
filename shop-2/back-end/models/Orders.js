const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    orderNumber: String,  // unique
    username: String,
    idUser:String,
    phone: String,
    images: String,
    products:
        {
            slug:String,
            quantity: Number,
            price: Number,
            total: Number
        }
    ,
    status: { type: String, default: "pending" },  // "pending", "processing", "shipped", "delivered", "cancelled"
    totalAmount: Number,
    shippingAddress: String,
    paymentMethod: String,
    paymentStatus: { type: String, default: "pending" },  // "pending", "paid"
    notes: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }   
})

module.exports = mongoose.model("orders", ordersSchema)