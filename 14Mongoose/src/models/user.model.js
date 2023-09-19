const mongoose = require("mongoose")
//const mongoosePaginate = require('mongoose-paginate-v2')

const userCollection = "usuarios"

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true, max: 100, index: true },
    last_name: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 50 },
    gender: { type: String, required: true, max: 50 }
})

//userSchema.plugin(mongoosePaginate)
const userModel = mongoose.model(userCollection, userSchema)

module.exports = { userModel }