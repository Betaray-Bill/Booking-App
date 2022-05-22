const jwt = require('jsonwebtoken')
const { createError } = require('./error');


const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You are not authenticated"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(createError(403, "Token is not valid"))
        }

        req.user = user;
        //  req.user , where user variable can be whatever we want.....req.meiow
        next()
    })
}

const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            return res.status(403).json("error")
        }
    })
}


const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            return res.status(403).json({ err: err })
        }
    })
}

module.exports = { verifyToken, verifyUser, verifyAdmin }