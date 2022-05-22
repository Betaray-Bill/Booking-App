const express = require('express')
const Hotel = require('../Models/Hotel');
const { createError } = require('../utils/error');
const router = express.Router()

// Get all hotel
const getAllHotels = async(req, res, next) => {
    const failed = true;
    // if (failed) return next(createError(401, "YOu are not Authenticated"))

    try {
        const hotels = await Hotel.find()
        res.status(200).json(hotels)
    } catch (err) {
        next(err)
    }
}

// Get a single hotel
const getHotel = async(req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (err) {
        res.status(500).json(err.message)
    }
}

// Create
const createHotel = async(req, res) => {
    const newHotel = new Hotel(req.body)

    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (err) {
        res.status(500).json(err.message)
    }
}

// Update
const updateHotel = async(req, res) => {

    try {
        const updatesHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        // new : true is added becoz, findByIdAndUpdate will return the previous state, by adding the third argument we can return the updated state
        res.status(200).json(updatesHotel)
    } catch (err) {
        res.status(500).json(err.message)
    }
}

// Delete
const deleteHotel = async(req, res) => {

    try {
        const deleteHotel = await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel Deleted")
    } catch (err) {
        res.status(500).json(err.message)
    }
}

module.exports = { getAllHotels, getHotel, createHotel, updateHotel, deleteHotel }