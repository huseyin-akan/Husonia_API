const {decodeToken} = require('../helpers/jwt-helper')
const {createCustomError} = require('../models/errors/custom-error');


const authorize = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer '))
    createCustomError('Please provide username and password', 401);
    
    const token = authHeader.split(' ')[1];
    const {id, username} = decodeToken(token);
    req.user = {id, username}; //you can get it from all middlewares now.

    console.log('Authorization successful')
    next();
}

module.exports = authorize;