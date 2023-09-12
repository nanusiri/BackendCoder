const mongoose = require("mongoose")

const productCollection = "productos"

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 200, index: true },
    precio: { type: Number, required: true, max: 100000 },
    stock: { type: Number, required: true, max: 1000 },
    category: { type: String, required: true, max: 200 },
})

const productModel = mongoose.model(productCollection, productSchema)

module.exports = { productModel }