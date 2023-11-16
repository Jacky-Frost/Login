const mongooses = require('mongoose')
const Schema = mongooses.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }, password: {
        type: String,
        required: true
    }
})

module.exports = mongooses.model('User', userSchema)