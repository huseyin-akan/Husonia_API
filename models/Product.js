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
    country:{
        type: String,
        required: true,
        default: 'Turkey',
        trim: true
    },
    category: {
        type: String,
        enum : {
            values:['fruit', 'tech', 'people', 'phones'],
            message: 'You cant add a category named : {VALUE}' //{VALUE} is the category value sent by user. 
        }, //we accept only these values from outside.
        required : [true, 'You must provide a category value.'] //Custom error message
    }, 
    status : {
        type: Boolean,
        default: false //we can give default values.
    },
    price : Number,
    createdDate : {
        type: Date,
        default : Date.now()
    },
    updatedDate : {
        type: Date,
        default : Date.now()
    }
});

module.exports = mongoose.model('Product', ProductSchema);