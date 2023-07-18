const errorHandler = (err, req, res, next) => {
    return res.status(500).json({err : err});
}

module.exports = errorHandler;

//TODO-HUS 2.57.20'de Custom error oluşturmada kaldık.