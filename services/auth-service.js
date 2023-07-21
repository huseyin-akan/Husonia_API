const {createCustomError} = require('../models/errors/custom-error');
const {createToken} = require('../helpers/jwt-helper');

const login= async (req, res) => {
	const {username, password} = req.body;
	if(!username || !password )  //TODO-HUS we need to do write a getUser from MongoDB.
        createCustomError('Please provide credentials.', 401);
    
        const token = createToken();
    return {msg: "Login Successful", token};
}

const register = (req, res) => {
    
}

module.exports = [login, register];