const mongoose = require('mongoose');

//Burada database collection'ımız için bir interface oluşturuyoruz diyebiliriz. Collection'ımız bu yapıya sahip olacak.
const ProductSchema = new mongoose.Schema({
    name : {
        type: String,
        required :true,
        trim : true,    // '   huso   ' gibi girişler için trim eder.
        maxlength : 20, 
        minlength : [2, 'Name cannot be less than 2 characters']    //Hata mesajını istediğimiz hata mesajı olarak verin istersek, dizin 2. değeri olarak verebiliriz.
    },
    category: {
        type: String,
        required : [true, 'You must provide a category value.'] //Custom error message
    }, 
    status : {
        type: Boolean,
        default: false //we can give default values.
    },
    age : Number
});

module.exports = mongoose.model('Product', ProductSchema);