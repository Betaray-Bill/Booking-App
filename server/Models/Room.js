const mongoose = require('mongoose')

const roomSchema = mongoose.Schema({
    title: {
        type: String,
    },
    price: {
        type: Number,
    },
    maxPeople: {
        type: Number,
    },
    desc: {
        type: String,
    },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
}, {
    timestamps: true,
})

module.exports = mongoose.model('Room', roomSchema)