const cors = require('cors')

const whitelist = [
    'http://localhost:3000'
]

const corsOptions = {
    origin: function (origin, callback) {
        //  Remove !origin for production
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

module.exports = corsOptions