const {createCustomError: _createCustomError} = require('../errors/custom-error');
const {createToken: _createToken} = require('../helpers/jwt-helper');
const { StatusCodes} = require('http-status-codes');
const { BadRequestError } = require('../errors');
const User = require('../models/User');


const login = async (req, res) => {
	const {username, password, email} = req.body;
	if((!username && !email) || !password ) _createCustomError('Please provide credentials.', StatusCodes.BAD_REQUEST);

    let user;
    if(username) user = await User.findOne({username});
    if(!user && email) user = await User.findOne({email});
    if(!user) _createCustomError('User login inputs are not correct!!', StatusCodes.NOT_FOUND);

    
    const passwordCheckResult = await user.comparePassword(password)
    if(!passwordCheckResult) _createCustomError('User login inputs are not correct!!', StatusCodes.NOT_FOUND);

    const token = _createToken(user); 
    return {msg: "Login Successful", token};
}

const register = async (req, res) => {
    const {name, username, email, password, passwordRepeat} = req.body;
    if(!name || !username || !email || !password || !passwordRepeat) throw new BadRequestError('Please fill all required areas...');
    if(password !== passwordRepeat) throw new BadRequestError('Your passwords dont match...');
    
    const tmpUser = {name, username, email, password};
    
    const user = await User.create({...tmpUser})
    return user;
}

module.exports = {login, register};