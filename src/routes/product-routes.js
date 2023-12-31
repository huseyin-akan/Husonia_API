const express = require('express');
const logger = require('../middlewares/logger');
const authorize = require('../middlewares/authorize');

const router = express.Router();

const [getPeopleV2, getProductById, getProductById2, saveProducts, updateProducts, updateProduct, deleteProduct, createProduct, createProducts,
    getAllProducts, replaceProduct, searchProducts]= require('../controllers/products-controller');

//we add logger middleware here.
router.get('/v2', logger, getPeopleV2)

//Route Parameter, //we add logger and authorize middleware here.
router.get('/getproductbyid/:productId', [logger, authorize], getProductById)

//Query Parameter
router.get('/getproductbyid', getProductById2)

//Chaining Roues With same route name. If it is a post method, saveProduct method will work. If it is a put method, updateProducts method will work.
router.route('/dmlproducts').post(saveProducts).put(updateProducts);
router.route('/product/:productId').get(() => {console.log('I worked 222')}, getProductById).delete(deleteProduct).patch(updateProduct); //Same stuff with above.

router.post('/createproduct', createProduct);
router.post('/saveproducts', createProducts);
router.patch('/updateproduct', updateProduct); //Patch method should patch only the sent fields.
router.put('/updateproduct', replaceProduct); //Put method should replace the product. Only sent fields will remain and others will be deleted.
router.get('/getallproducts', getAllProducts);
router.get('/searchProducts', searchProducts)

module.exports = router;