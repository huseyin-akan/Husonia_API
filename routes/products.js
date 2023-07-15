const express = require('express');
const logger = require('../logger');
const authorize = require('../authorize');

const router = express.Router();

const {getPeople, getPeopleV2, getProductById, getProductById2} = require('../controllers/products-controller');

//returning JSON
router.get('/', [logger, authorize], getPeople)

//mapping return data
router.get('/v2', getPeopleV2)

//Route Parameter
router.get('/getproductbyid/:productId', getProductById)

//Query Parameter
router.get('/getproductbyid', getProductById2)

module.exports = router;