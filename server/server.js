const express = require('express')

//  Define PORT
const PORT = process.env.PORT || 5000

//  Create Server
const server = express()



server.listen(PORT, console.log(`Server listening on port ${PORT}`))