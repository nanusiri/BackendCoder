const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    age: String,
    password: String,
    cart: String,
    role: {
        type: String,
        default: 'user',
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;