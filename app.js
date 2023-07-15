const express = require('express');
const path = require('path');

const logger = require('./logger');
const authorize = require('./authorize');

const products = require('./routes/products');
const auth = require('./routes/auth');

const app = express();

//Uygulamamıza logger middleware'ı ekledik ve tüm route'larda çalışacak.
app.use([logger, authorize]);

//app.use('/api', logger); //logger middleware will be applied to only routes starting with api.

//Serve static files in this folder path.
app.use(express.static('./public'))

//Parse FormData if using classic html form posting.
app.use(express.urlencoded({extended:false}))
//Parse JSON data if using JS posting
app.use(express.json() );

app.use('/api/v1/products', products);
app.use('/api/v1/auth', auth);

app.listen(5007, () => {
	console.log("Server is listening on port 5007...");
});

//sending an html file
//we added logger middleware before the callback function.
//this will work twice because we also have a global logger middleware
app.get('/', logger, (req, res) => {
	res.status(200).sendFile(path.resolve(__dirname, './navbar/index.html'));
});

//returning some text
app.get('/about', (req, res) => {
	res.status(200).send('About Page');
});

//Handles all HTTP verbs.
//If request path is not registered:
app.all('*', (req, res) => {
	res.status(404).send(`
	<h1> Routing Error </h1>
	<p> This page doesnt exist. Please go back home and navigate from there!!! </p>
	<a href="/"> Go Home</a>
	`);
});


