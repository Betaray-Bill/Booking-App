const express = require('express');
const { getRoom, createRooms, updateRoom, deleteRoom, getAllRoom } = require('../controllers/room');
const router = express.Router()
const { verifyAdmin } = require('../utils/verifyToken');

// Get a single hotel
router.get("/:id", getRoom)

// Get all hotel
router.get("/:id", getAllRoom)

// Create
router.post('/:hotelid', verifyAdmin, createRooms)

// Update
router.put('/:id', verifyAdmin, updateRoom)

// Delete
router.delete('/:id', verifyAdmin, deleteRoom)

module.exports = router