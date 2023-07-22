const [_login, _register] = require('../services/auth-service');

const login = async (req, res) => {
	var result = await _login(req,res);
    res.status(200).json(result);
}

const register = async (req, res) => {
    var result = await _register(req,res);
    res.status(200).json(result);
}

module.exports = [login, register];