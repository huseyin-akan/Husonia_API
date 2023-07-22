require('dotenv').config();
const jwt = require('jsonwebtoken');
const {createCustomError} = require('../errors/custom-error');

const createToken = () => {
    let id = 123;
    let username = "husokanus";

    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: '30d'});
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