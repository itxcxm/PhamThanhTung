const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, unique: true },  // unique
    password: String,  // mã hóa
    email: { type: String, unique: true },     // unique
    fullName: String,
    phone: String,
    address: { type: String, default:"" },
    role: { type: String, enum: ["admin", "user"], default: "user" },      // "admin" hoặc "user"
    isActive: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("user", userSchema)