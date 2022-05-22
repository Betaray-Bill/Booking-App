const express = require('express');
const { getAllHotels, getHotel, createHotel, updateHotel, deleteHotel } = require('../controllers/hotel');
const { verifyAdmin } = require('../utils/verifyToken');
const router = express.Router()

// Get all hotel
router.get("/", getAllHotels)

// Get a single hotel
router.get("/:id", getHotel)

// Create
router.post('/', verifyAdmin, createHotel)

// Update
router.put('/:id', verifyAdmin, updateHotel)

// Delete
router.delete('/:id', verifyAdmin, deleteHotel)

module.exports = router