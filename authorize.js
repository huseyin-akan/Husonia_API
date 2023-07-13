const authorize = (req, res, next) => {
    console.log('authorize middleware worked.')

    next();
}

module.exports = authorize;