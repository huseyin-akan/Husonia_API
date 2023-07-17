const mongoose = require('mongoose');

//Burada database collection'ımız için bir interface oluşturuyoruz diyebiliriz. Collection'ımız bu yapıya sahip olacak.
const ProductSchema = new mongoose.Schema({
    name : String, 
    status : Boolean,
    createdDate : Date,
    updatedDate : Date
});

module.exports = mongoose.model('Product', ProductSchema);