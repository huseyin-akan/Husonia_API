        const {products} = require('../data');
        const Product = require('../models/Product')
        
        //returning JSON
        const getPeople = (req, res) => {
                res.json(products);
        };

        //mapping return data
        const getPeopleV2 = (req, res) => {
                const newProducts = products.map( (product) => {
                        const {id, name, image} = product;
                        return {id, name, image};
                })
                res.json(newProducts);
        };

        const getProductById= (req, res) => {
                const {productId} = req.params;
                const singleProduct = products.find( product => product.id === Number(productId) );
        
                if(!singleProduct) return res.status(404).send('Product does not exist');
        
                res.json(singleProduct);
        };

        const getProductById2 = (req, res) => {
                const {productId} = req.query;
                const singleProduct = products.find( product => product.id === Number(productId) );
        
                if(!singleProduct) return res.status(404).send('Product does not exist');
                res.json(singleProduct);
        }

        const saveProducts = (req, res) => {
                const {product} = req.body;
                console.log('Product added to DB. Added Product: ' + product.name);
                res.json({result : true, message: 'Successful'})
        }
        //1.22.41'de kaldık. TODO-HUs

        const updateProducts = (req, res) => {
                const {product} = req.body;
                console.log('Product updated. Updated Product: ' + product.name);
                res.json({result : true, message: 'Successful'})
        }

        const updateProduct = (req, res) => {
                const {productId} = req.params;
                const singleProduct = products.find( product => product.id === Number(productId) );
                console.log('Product deleted from DB. Deleted Product: ' + singleProduct.name);
                res.json({result : true, message: 'Successful'})
        }

        const deleteProduct = (req, res) => {
                const {productId} = req.params;
                const singleProduct = products.find( product => product.id === Number(productId) );
                console.log('Product updated. Updated Product: ' + singleProduct.name);
                res.json({result : true, message: 'Successful'})
        }

        module.exports = [getPeople, getPeopleV2, getProductById, getProductById2, saveProducts, updateProducts, updateProduct, deleteProduct]