const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
    name: String,
    slug: String,      // unique
    description: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("categories", categoriesSchema)