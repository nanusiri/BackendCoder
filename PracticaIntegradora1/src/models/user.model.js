const mongoose = require("mongoose")

const userCollection = "usuarios"

const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true, max: 200 },
    email: { type: String, required: true, max: 100 },
    id: { type: String, required: true, max: 50, unique: true }
})

const userModel = mongoose.model(userCollection, userSchema)

module.exports = { userModel }