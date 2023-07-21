const {CustomAPIError} = require('../models/errors/custom-error')

const errorHandler = (err, req, res, next) => {
    
    console.log('error happened');
    
    //Bizim fırlattığımız hata ise, fırlattığımız hatayı json olarak dönüyoruz.
    if(err instanceof CustomAPIError) return res.status(err.statusCode).json({msg: err.message});

    //Unexpected errors.
    return res.status(500).json({msg : 'Unexpected error occured. Please try again later.'});
}

module.exports = errorHandler;
