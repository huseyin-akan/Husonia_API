const {decodeToken: _decodeToken} = require('../helpers/jwt-helper')
const {createCustomError : _createCustomError} = require('../errors/custom-error');
const {StatusCodes} = require('http-status-codes');
const User = require('../models/User');


const authorize = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer '))
        _createCustomError('Please provide username and password', StatusCodes.UNAUTHORIZED);
    
    const token = authHeader.split(' ')[1];
    const {id, username} = _decodeToken(token);
    const user = await User.findById(id).select('-password') //doesnt select password field.
    req.user = user; //you can get it from all middlewares now.

    console.log(user);

    console.log('Authorization successful')
    next();
}

module.exports = authorize;