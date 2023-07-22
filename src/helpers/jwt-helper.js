require('dotenv').config();
const jwt = require('jsonwebtoken');
const {createCustomError} = require('../errors/custom-error');

const createToken = (user) => {
    let id = user._id;
    let username = user.username;

    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME});
    return token;
}

const decodeToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        createCustomError('You are not authorized to access this route', 401);
    }
}

module.exports = {createToken, decodeToken}