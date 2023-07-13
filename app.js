const express = require('express');
const path = require('path');
const {products} = require('./data');
const logger = require('./logger');
const authorize = require('./authorize');

const app = express();

//Uygulamamıza logger middleware'ı ekledik ve tüm route'larda çalışacak.
app.use([logger, authorize]);

//app.use('/api', logger); //logger middleware will be applied to only routes starting with api.

//Serve static files in this folder path.
app.use(express.static('./public'))

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

//returning JSON
app.get('/api/products', [logger, authorize], (req, res) => {
	res.json(products);
})

//mapping return data
app.get('/api/products2', (req, res) => {
	const newProducts = products.map( (product) => {
		const {id, name, image} = product;
		return {id, name, image};
	})
	res.json(newProducts);
})

//Route Parameter
app.get('/api/getproductbyid/:productId', (req, res) => {
	const {productId} = req.params;
	const singleProduct = products.find( product => product.id === Number(productId) );

	if(!singleProduct) return res.status(404).send('Product does not exist');

	res.json(singleProduct);
})

//Query Parameter
app.get('/api/v1/getproductbyid', (req, res) => {
	const {productId} = req.query;
	const singleProduct = products.find( product => product.id === Number(productId) );

	if(!singleProduct) return res.status(404).send('Product does not exist');
	res.json(singleProduct);
})

//Handles all HTTP verbs.
//If request path is not registered:
app.all('*', (req, res) => {
	res.status(404).send(`
	<h1> Routing Error </h1>
	<p> This page doesnt exist. Please go back home and navigate from there!!! </p>
	<a href="/"> Go Home</a>
	`);
});


