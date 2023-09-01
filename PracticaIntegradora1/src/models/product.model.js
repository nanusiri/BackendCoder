const mongoose = require("mongoose")

const productCollection = "productos"

const productSchema = new mongoose.Schema({
    nombre: { type: String, required: true, max: 200 },
    categoria: { type: String, required: true, max: 100 },
    precio: { type: Number, required: true, max: 100000 },
    stock: { type: Number, required: true, max: 50 },
    imagen: { type: String, required: true, max: 1000 }
})

const productModel = mongoose.model(productCollection, productSchema)

module.exports = { productModel }