const User = require('../data/User')

const bcrypt = require('bcrypt')

const handleLogin = async (req,res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ 'message': 'Username and Password required' })
    }
    
    const findUser = await User.findOne({ "username": username }).exec()

    if (!findUser) {
        return res.status(400).json({ 'message': 'Username is not registered' })
    }

    const match = await bcrypt.compare(password, findUser.password)

    if (match) {
        return res.status(200).json({ 'message': 'User is logged in' })
    } else {
        return res.status(401).json({ 'message': `Password is incorrect` })
    }
}

module.exports = { handleLogin }