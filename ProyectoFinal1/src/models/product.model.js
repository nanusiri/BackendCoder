const mongoose = require("mongoose")

const productCollection = "productos"

const productSchema = new mongoose.Schema({
    productTitle: { type: String, required: true, index: true },
    productDescription: { type: String, required: true },
    productCode: { type: Number, required: true },
    productPrice: { type: Number, required: true },
    productStatus: { type: Boolean },
    productStock: { type: Number, required: true },
    productCategory: { type: String, required: true }
})

const productModel = mongoose.model(productCollection, productSchema)

module.exports = { productModel }