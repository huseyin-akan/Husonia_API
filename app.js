const express = require('express');
const {log} = require('./src/utilities/husoLogger');
const connectDB = require('./src/db/connect');
require('dotenv').config();	//.env dosyasından değişken okuyoruz. Bu dosyayı github'a pushlamıyoruz. process.env.MONGO_URI olarak erişebiliyoruz. process global bir değişken.
require('express-async-errors') //this packages provides us a structure by which we can throw errors in async methods and our error-handler will catch them. 

//Middlewares
const logger = require('./src/middlewares/logger');
const authorize = require('./src/middlewares/authorize');
const notFound = require('./src/middlewares/not-found');
const errorHandler = require('./src/middlewares/error-handler');
//Routes
const products = require('./src/routes/product-routes');
const auth = require('./src/routes/auth-routes');
const pages = require('./src/routes/page-routes');

//TODO-HUS 06.19.41  http-status-codes kütüphanesinde kaldık.

const app = express();
const port = process.env.PORT || 5007; //if not set use 5007.

//Uygulamamıza logger middleware'ı ekledik ve tüm route'larda çalışacak.
app.use([logger]); //[logger, authorize]
//app.use('/api', logger); //logger middleware will be applied to only routes starting with api.

//Serve static files in this folder path.
app.use(express.static('./public'))

//Parse FormData if using classic html form posting.
app.use(express.urlencoded({extended:false}))
//Parse JSON data to read from req.body if using JS posting
app.use(express.json() );

//Routes Middleware:
app.use('/api/v1/products', authorize, products);
app.use('/api/v1/auth', auth);
app.use('', pages)

//Handles all HTTP verbs if request path is not registered:
app.all('*', notFound);
app.use(errorHandler); //error handler should be the last middleware.

const start = async () => {
	try{
		await connectDB(process.env.MONGO_URI);
		log('Connected to DB...', 'yellow', false);
		app.listen(port, () => { log(`Server is listening on port ${port} ...`); });
	}
	catch(error){ log(error, 'red'); }
}

start();