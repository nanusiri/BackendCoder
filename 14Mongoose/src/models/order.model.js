const mongoose = require("mongoose")

const orderCollection = "orders"

const orderSchema = mongoose.Schema({
    name: String,
    sizsize: {
        type: String,
        enum: ["small", "medium", "large"],
        default: "medium"
    },
    price: Number,
    quantity: Number,
    date: Date
})

const orderModel = mongoose.model(orderCollection, orderSchema)

module.exports = { orderModel }