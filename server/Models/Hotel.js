const mongoose = require('mongoose')

const hotelSchema = mongoose.Schema({
    name: {
        type: String,
    },
    type: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    distances: {
        type: String,
        required: true
    },
    photos: {
        type: [String]
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        max: 5
    },
    rooms: {
        type: [String],
    },
    cheapestPrice: {
        type: Number,
    },
    Features: {
        type: Boolean,
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Hotel', hotelSchema)