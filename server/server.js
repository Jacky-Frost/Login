//  Environment
require('dotenv').config()

// Core Modules
const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')

//  Define PORT and Connect to MongoDB
const PORT = process.env.PORT || 5000
connectDB()

//  Create Server
const server = express()

//  MiddleWare  //

server.use(express.json())

//  End MiddleWare  //

server.use('/register', require('./routes/register'))
server.use('/login', require('./routes/login'))


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    server.listen(PORT, console.log(`Server listening on port ${PORT}`))
})