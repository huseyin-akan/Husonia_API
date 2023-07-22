const {decodeToken} = require('../helpers/jwt-helper')
const {createCustomError} = require('../errors/custom-error');
const {StatusCodes} = require('http-status-codes')


const authorize = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer '))
    createCustomError('Please provide username and password', StatusCodes.UNAUTHORIZED);
    
    const token = authHeader.split(' ')[1];
    const {id, username} = decodeToken(token);
    req.user = {id, username}; //you can get it from all middlewares now.

    console.log('Authorization successful')
    next();
}

module.exports = authorize;