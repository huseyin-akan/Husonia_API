const Product = require("../models/Product"); //TODO-HUS bunun burda olmaması lazım. Yavaş yavaş eriticez.
const asyncWrapper = require("../middlewares/async");
const {createCustomError} = require("../errors/custom-error");
const {StatusCodes} = require('http-status-codes');

const {searchProducts: _searchProducts, getAllProducts: _getAllProduct,
  createProduct: _createProduct, deleteProduct: _deleteProduct} = require('../services/product-service');

//mapping return data //TODO-HUS people'dan kurtul bu mapleme taktiğini bi product metoduna yaz.
const getPeopleV2 = (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });
  res.json(newProducts);
};

const getProductById = async (req, res) => {
  const product = await _getProductById(req, res);
  res.status(StatusCodes.OK).json(product);
};

const getProductById2 = asyncWrapper(async (req, res, next) => {
  const { productId } = req.params;
  const singleProduct = await Product.findOne({ _id: productId });

  if (!singleProduct)
    return next(createCustomError("Product does not exist", 404));

  res.status(StatusCodes.OK).json(singleProduct);
});

const saveProducts = (req, res) => {
  const { product } = req.body;
  console.log("Product added to DB. Added Product: " + product.name);
  res.json({ result: true, message: "Successful" });
};

const updateProducts = (req, res) => {
  const { product } = req.body;
  console.log("Product updated. Updated Product: " + product.name);
  res.json({ result: true, message: "Successful" });
};

const updateProduct = async (req, res) => {
  try {
    const product = req.body;
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: product.id },
      product,
      { new: true, runValidators: true } //Bunu göndermezsen sana eski productı döner ve, validatorları çalıştırmaz.
    );
    if (!updatedProduct)
      return res
        .status(404)
        .json("No product found for updating with id: " + product.id);
    res.status(StatusCodes.OK).json(updatedProduct);
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const replaceProduct = async (req, res) => {
  try {
    const product = req.body;
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: product.id },
      product,
      { new: true, overwrite: true } //replaces the old product with new data and returns the new product
    );
    if (!updatedProduct)
      return res
        .status(404)
        .json("No product found for updating with id: " + product.id);
    res.status(StatusCodes.OK).json(updatedProduct);
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const deleteProduct = async (req, res) => {
  await _deleteProduct(req, res);
  res.status(StatusCodes.OK).send();
};

const createProduct = async (req, res) => {
  const createdProduct = await _createProduct(req, res);
  res.status(StatusCodes.CREATED).json(createdProduct);
};

const createProducts = async (req, res) => {
  const products = req.body;
  var result = await Product.insertMany(products);
  res.status(StatusCodes.UNAUTHORIZED).json(result);
};

const getAllProducts = async (req, res) => {
  const products = await _getAllProduct();
  res.status(StatusCodes.OK).json(products);
};

const searchProducts = async (req, res) => {
  const products = await _searchProducts(req);
  res.json(products); //it already sends 200 so i dont write .status(200);
}

module.exports = [
  getPeopleV2,
  getProductById,
  getProductById2,
  saveProducts,
  updateProducts,
  updateProduct,
  deleteProduct,
  createProduct,
  createProducts,
  getAllProducts,
  replaceProduct,
  searchProducts,
];
