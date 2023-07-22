const express = require('express');
const router = express.Router();
const [login, register] = require('../controllers/auth-controller');


router.route('/login').post(login);
router.post('/register', register);

module.exports = router;