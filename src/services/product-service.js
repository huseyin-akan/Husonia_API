const Product = require("../models/Product");
const [addNumericFiltersToQueryObj] = require('../helpers/mongo-helper');
const {NotFoundError} = require('../errors/index');

const numericFilterOptions = ['age', 'price']; 

const searchProducts = async (req) => {
  const {name, country, status, numericFilters, sort, fields} = req.query;
  const page = Number(req.query.page) || 1; //if user doesnt send a value, then show 1. page.
  const limit = Number(req.query.limit) || 10;
  const skip = (page -1 ) * limit;
  const queryObject = {};

  if(name) queryObject.name = name; //returns if name matches exactly
  if(country) queryObject.country = {$regex: country, $options: 'i'}; //returns if country contains search value, i -> case insensitive
  if(status) queryObject.status = status === 'true' ? true : false;  
  if(numericFilters) addNumericFiltersToQueryObj(queryObject, numericFilters, numericFilterOptions);

  let query = Product.find(queryObject);
  if(sort) query = query.sort(sort.split(',').join(' ')); //name,-price --> name -price //sorts name asc, price desc
  else query = query.sort('createdDate'); //if no sort is provided, we sort according to createdDate ascending 
  
  //TODO-HUS check if .replace(',', ' '); will do the job also?
  if(fields) query.select(fields.split(',').join(' ')); //name price --> selects only these 2 fields and also _id field by default

  query.skip(skip).limit(limit);

  const products = await query.exec();
  return products;
}

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  return products;
}

const getProductById = async (req, res) => {
  const { productId } = req.query;
  const singleProduct = await Product.findOne({ _id: productId });

  if (!singleProduct) throw new NotFoundError("Product does not exist");

  return singleProduct;
};

const createProduct = async (req, res) => {
  const product2 = req.body;
  const user2 = req.user;
  product.createdBy = user._id;

  const createdProduct = await Product.create(product)
  return createdProduct;  
}

const deleteProduct = async (req,res) => {
  const { productId } = req.params;
  const deletedProduct = await Product.findOneAndDelete({ _id: productId });
  if (!deletedProduct) throw new NotFoundError("Product does not exist");
  return deletedProduct; 
}

module.exports = {searchProducts, getAllProducts, getProductById, createProduct, deleteProduct};