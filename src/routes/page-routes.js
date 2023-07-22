const express = require('express');
const path = require('path');
const router = express.Router();

//sending an html file
router.get('/', (req, res) => {
	res.status(200).sendFile(path.resolve(__dirname, '../navbar/index.html'));
});

//returning some text when requested about page
router.get('/about', (req, res) => {
	res.status(200).send('About Page');
});

//here we havent used controllers. But we could.

module.exports = router;