const asyncWrapper = (func) => {
    return async(req, res, next) => {
        try {
            await func(req, res, next)
        } catch (error) {
            next(error);
        }
    }
}

module.exports = asyncWrapper;

//Not: we dont need this wrapper anymore, since express-async-errors package takes care of async errors. But still lets see whats going on under the hood.