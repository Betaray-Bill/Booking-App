const Hotel = require("../Models/Hotel")
const bcrypt = require('bcryptjs')
const { createError } = require('../utils/error');
const jwt = require("jsonwebtoken");
const Room = require("../Models/Room");


const createRooms = async(req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: {
                    rooms: savedRoom._id
                }
            })
            res.status(200).json(savedRoom)
        } catch (err) {
            next(err)
        }
    } catch (err) {
        next(err)
    }
}




// Get all hotel
const getAllRoom = async(req, res, next) => {
    const failed = true;
    // if (failed) return next(createError(401, "YOu are not Authenticated"))

    try {
        const Rooms = await Room.find()
        res.status(200).json(Rooms)
    } catch (err) {
        next(err)
    }
}

// Get a single Room
const getRoom = async(req, res) => {
    try {
        const Room = await Room.findById(req.params.id)
        res.status(200).json(Room)
    } catch (err) {
        res.status(500).json(err.message)
    }
}

const updateRoom = async(req, res) => {

    try {
        const updatesRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        // new : true is added becoz, findByIdAndUpdate will return the previous state, by adding the third argument we can return the updated state
        res.status(200).json(updatesRoom)
    } catch (err) {
        res.status(500).json(err.message)
    }
}

// Delete
const deleteRoom = async(req, res) => {

    try {
        const deleteRoom = await Room.findByIdAndDelete(req.params.id);
        res.status(200).json("Room Deleted")
    } catch (err) {
        res.status(500).json(err.message)
    }
}



module.exports = { createRooms, deleteRoom, updateRoom, getAllRoom, getRoom }