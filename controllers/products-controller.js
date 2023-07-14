        const {products} = require('../data');
        
        const getPeople = (req, res) => {
                res.json(products);
        };

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

        module.exports = {getPeople, getPeopleV2, getProductById, getProductById2}