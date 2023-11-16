const User = require('../data/User')

const handleLogin = async (req,res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ 'message': 'Username and Password required' })
    }
    
    const findUser = User.findOne({ "username": username })

    if (!findUser) {
        return res.status(400).json({ 'message': 'Username is not registered' })
    }
}