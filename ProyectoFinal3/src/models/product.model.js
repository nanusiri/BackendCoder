const mongoose = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2');

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

productSchema.plugin(mongoosePaginate)

const productModel = mongoose.model(productCollection, productSchema)

module.exports = { productModel }