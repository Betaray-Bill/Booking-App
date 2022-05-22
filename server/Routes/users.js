const express = require('express');
const { getAllUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/User');
const { verifyToken, verifyUser, verifyAdmin } = require('../utils/verifyToken');
const router = express.Router()

router.get("/checkauthentication", verifyToken, (req, res, next) => {
    res.send("Vanakam da manda, u are logged in ")
})

router.get('/checkuser/:id', verifyUser, (req, res, next) => {
    res.send("Vanakam da manda, u are logged in ")
})

// Get all User
router.get("/", verifyAdmin, getAllUsers)

// Get a single User
router.get("/:id", verifyUser, getUser)

// Create
router.post('/', verifyUser, createUser)

// Update
router.put('/:id', verifyUser, updateUser)

// Delete
router.delete('/:id', verifyUser, deleteUser)

module.exports = router