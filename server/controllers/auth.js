const User = require("../Models/User")
const bcrypt = require('bcryptjs')
const { createError } = require('../utils/error');
const jwt = require("jsonwebtoken")

// Register
const register = async(req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10)
        const hashed_password = bcrypt.hashSync(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashed_password,
        })

        await newUser.save()
        res.status(200).send({ newUser })
    } catch (err) {
        next(err)
    }
}


// Login
const login = async(req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) return next(createError(401, "User doesn't exist"))

        const is_passwordCorrect = await bcrypt.compare(req.body.password, user.password)

        if (!is_passwordCorrect) return next(createError(401, "Password is incorrect"))

        // If password is correct we can assign JWT to the user
        const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET)

        const { password, isAdmin, ...otherDetails } = user._doc
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json({ otherDetails })
    } catch (err) {
        next(err)
    }
}

module.exports = { register, login }