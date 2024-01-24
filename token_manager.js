require('dotenv').config()
const jwt = require('jsonwebtoken')

// Generate a token
function generateAccessToken(userId) {
    return jwt.sign(userId, process.env.TOKEN_SECRET, {})
}

// Authenticate Token
function authenticateToken(req, res, next){
    const token = req.get('Authorization')

    if(token === null) {
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
        if (error){
            return res.sendStatus(405)
        }

        req.user = user //if the token is valid it will get the user id and set the req.user to the actual user id 
        next()
    })
}

module.exports = {
    generateAccessToken,
    authenticateToken
}