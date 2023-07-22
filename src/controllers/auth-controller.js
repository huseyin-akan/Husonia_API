const {login : _login, register: _register} = require('../services/auth-service');
const {createToken : _createToken} = require('../helpers/jwt-helper');
const {StatusCodes} = require('http-status-codes');


const login = async (req, res) => {
	const result = await _login(req,res);
    res.status(StatusCodes.OK).json(result);
}

const register = async (req, res) => {
    const user = await _register(req,res);
    const token = _createToken(user);
    res.status(StatusCodes.OK).json({success: true, msg: 'User created successfully...', token});
}

module.exports = {login, register};