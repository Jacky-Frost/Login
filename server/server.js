// Core Modules
const express = require('express')

// Environment
require('dotenv').config()

//  Define PORT
const PORT = process.env.PORT || 5000

//  Create Server
const server = express()

//  ROUTES
server.use('/login', require('./routes/login'))
server.use('/register', require('./routes/register'))

server.listen(PORT, console.log(`Server listening on port ${PORT}`))