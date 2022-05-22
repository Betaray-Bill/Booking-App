const express = require('express')
const User = require('../Models/User');
const { createError } = require('../utils/error');
const router = express.Router()

// Get all User
const getAllUsers = async(req, res, next) => {
    const failed = true;
    // if (failed) return next(createError(401, "YOu are not Authenticated"))

    try {
        const Users = await User.find()
        res.status(200).json(Users)
    } catch (err) {
        next(err)
    }
}

// Get a single User
const getUser = async(req, res) => {
    try {
        const User = await User.findById(req.params.id)
        res.status(200).json(User)
    } catch (err) {
        res.status(500).json(err.message)
    }
}

// Create
const createUser = async(req, res) => {
    const newUser = new User(req.body)

    try {
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    } catch (err) {
        res.status(500).json(err.message)
    }
}

// Update
const updateUser = async(req, res) => {

    try {
        const updatesUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        // new : true is added becoz, findByIdAndUpdate will return the previous state, by adding the third argument we can return the updated state
        res.status(200).json(updatesUser)
    } catch (err) {
        res.status(500).json(err.message)
    }
}

// Delete
const deleteUser = async(req, res) => {

    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User Deleted")
    } catch (err) {
        res.status(500).json(err.message)
    }
}

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser }