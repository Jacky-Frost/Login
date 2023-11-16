const User = require('../data/User')
const bcrypt = require('bcrypt')
const saltRounds = 10


const handleRegister = async (req,res) => {

    const { email, username, password } = req.body
    if (!username || !password || !email) {
    
        return res.status(400).json({ 'message': 'Email, Username and Password Required'})
    }
    
    const duplicateUser = await User.findOne({ username: username }).exec()
    const duplicateEmail = await User.findOne({ email: email }).exec()

    if (duplicateUser || duplicateEmail) {
    
        if (duplicateUser && duplicateEmail) {
            return res.status(409).json({ 'message': `The username ${username} and email are already taken`})
        } else if (duplicateUser) {
            return res.status(409).json({ 'message': `The username ${username} is taken`})
        } else {
            return res.status(409).json({ 'message': `The email ${email} is already in registered`})
        }
    }

    try {
        const hashedPWD = await bcrypt.hash(password, saltRounds)
        await User.create({
            "email": email,
            "username": username,
            "password": hashedPWD
        })
        res.status(202).json({ 'message': 'new user created'})
    
    } catch (error) {
        res.status(500).json({ 'message': `${error.message}`})
    
    }
}

module.exports = { handleRegister }