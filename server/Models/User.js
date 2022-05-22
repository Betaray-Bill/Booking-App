const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    country: {
        type: String,
    },
    img: {
        type: String,
    },
    city: {
        type: String,
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)