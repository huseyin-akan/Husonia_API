const { products } = require("../data");
const Product = require("../models/Product");
const asyncWrapper = require('../middlewares/async')

//returning JSON
const getPeople = (req, res) => {
  res.json(products);
};

//mapping return data
const getPeopleV2 = (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });
  res.json(newProducts);
};

const getProductById = asyncWrapper(
        async (req, res) => {
                const { productId } = req.params;
                const singleProduct = await Product.findOne({ _id: productId });
              
                if (!singleProduct) return res.status(404).send("Product does not exist");
              
                res.status(200).json(singleProduct);
        }
);
 

const getProductById2 = async (req, res) => {
  const { productId } = req.query;
  const singleProduct = await Product.findOne({ _id: productId });

  if (!singleProduct) return res.status(404).send("Product does not exist");
  res.status(200).json(singleProduct);
};

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
      {new: true, runValidators : true} //Bunu göndermezsen sana eski productı döner ve, validatorları çalıştırmaz. 
    );
    if (!updatedProduct)
      return res
        .status(404)
        .json("No product found for updating with id: " + product.id);
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const replaceProduct = async (req, res) => {
        try {
          const product = req.body;
          const updatedProduct = await Product.findOneAndUpdate(
            { _id: product.id },
            product,
            {new: true, overwrite :true} //replaces the old product with new data and returns the new product
          );
          if (!updatedProduct)
            return res
              .status(404)
              .json("No product found for updating with id: " + product.id);
          res.status(200).json(updatedProduct);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      };

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOneAndDelete({ _id: productId });
    if (!product) return res.status(404).json("Item is not found");
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createProduct = async (req, res) => {
  const product = req.body;

  await Product.create(product)
    .then((result) => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err.message);
    });
};

const createProducts = async (req, res) => {
  const products = req.body;
  var result = await Product.insertMany(products);
  console.log(result);
  res.status(201).json(result);
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    console;
    res.status(400).json(err);
  }
};

module.exports = [
  getPeople,
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
  replaceProduct
];
