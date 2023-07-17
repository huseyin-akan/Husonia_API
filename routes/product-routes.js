const express = require('express');
const logger = require('../middlewares/logger');
const authorize = require('../middlewares/authorize');

const router = express.Router();

const [getPeople, getPeopleV2, getProductById, getProductById2, saveProducts, updateProducts, updateProduct, deleteProduct]= require('../controllers/products-controller');

//we add logger and authorize middleware here.
router.get('/', [logger, authorize], getPeople)

//we add logger middleware here.
router.get('/v2', logger, getPeopleV2)

//Route Parameter
router.get('/getproductbyid/:productId', getProductById)

//Query Parameter
router.get('/getproductbyid', getProductById2)

//Chaining Roues With same route name. If it is a post method, saveProduct method will work. If it is a put method, updateProducts method will work.
router.route('/dmlproducts').post(saveProducts).put(updateProducts);
router.route('/:productId').get(getProductById).delete(deleteProduct).patch(updateProduct); //Same stuff with above.

module.exports = router;