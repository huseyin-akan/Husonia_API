const {createCustomError} = require('../errors/custom-error');
const {createToken} = require('../helpers/jwt-helper');
const {StatusCodes} = require('http-status-codes')

const login= async (req, res) => {
	const {username, password} = req.body;
	if(!username || !password )  //TODO-HUS we need to do write a getUser from MongoDB.
        createCustomError('Please provide credentials.', StatusCodes.UNAUTHORIZED);
    
        const token = createToken();
    return {msg: "Login Successful", token};
}

const register = (req, res) => {
    
}

module.exports = [login, register];