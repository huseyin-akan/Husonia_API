const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
	const {name} = req.body;
	if(name){
		return res.status(200).send(`Welcome ${name}`);
	}

	res.status(401).send('Please provide credentials.')
})

router.post('/login2', (req, res) => {
	const {name} = req.body;
	if(name){
		return res.status(200).json({success: true, message: `Welcome ${name}`});
	}

	res.status(401).json({success : false, message: 'Please provide a name value'})
})

module.exports = router;