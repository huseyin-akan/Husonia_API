const {CustomAPIError} = require('../errors/custom-error');
const {StatusCodes} = require('http-status-codes')

const errorHandler = (err, req, res, next) => {
    
    console.log('error happened');
    
    //Bizim fırlattığımız hata ise, fırlattığımız hatayı json olarak dönüyoruz.
    if(err instanceof CustomAPIError) return res.status(err.statusCode).json({msg: err.message});

    //Unexpected errors.
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg : 'Unexpected error occured. Please try again later.'});
}

module.exports = errorHandler;
