const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./Config/db');
const authRoutes = require('./Routes/auth')
const hotelsRoutes = require('./Routes/hotel')
const roomsRoutes = require('./Routes/rooms')
const usersRoutes = require('./Routes/users')

// defining the lib
const app = express();
dotenv.config()
const PORT = process.env.PORT || 5000;

// Middleware 
//Error handling Middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
    // Connecting the Database
connectDB()

//Calling Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/rooms', roomsRoutes)
app.use('/api/hotels', hotelsRoutes)

// Opening the PORT
app.listen(PORT, () => {
    console.log(`Server Opened in PORT : ${PORT}`)
})