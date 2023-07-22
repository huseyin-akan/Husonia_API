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

//Security
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

//TODO-HUS 07.38.41  yeni projede kaldık.

const app = express();
const port = process.env.PORT || 5007; //if not set use 5007.

//Uygulamamıza logger middleware'ı ekledik ve tüm route'larda çalışacak.
app.use([logger]); //[logger, authorize]
//app.use('/api', logger); //logger middleware will be applied to only routes starting with api.

//Serve static files in this folder path.
app.use(express.static('./public'))

//Parse FormData if using classic html form posting.
app.use(express.urlencoded({extended:false}))

app.set('trust proxy', 1); //if the project is behind a proxy, add this.
//Rate Limiting
app.use(rateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
}) );

//Parse JSON data to read from req.body if using JS posting
app.use(express.json() );

app.use(cors() );
app.use(helmet() );
app.use(xss() );

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