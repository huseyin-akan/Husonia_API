const {CustomAPIError} = require('../errors/custom-error');
const {StatusCodes} = require('http-status-codes');
const {ValidationError} = require('mongoose').Error;

const errorHandler = (err, req, res, next) => {
    
    console.log('error happened');
    console.log(err);
    
    //We catch our API error.
    if(err instanceof CustomAPIError) return res.status(err.statusCode).json({msg: err.message});
    
    //MongoDB Validation Error
    if(err instanceof ValidationError) return res.status(StatusCodes.BAD_REQUEST).json({err});

    //Unexpected errors.
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg : 'Unexpected error occured. Please try again later.'});
}

module.exports = errorHandler;
