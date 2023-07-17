//Express supplies req,res and next parameters.
const logger = (req, res, next) => {
	const {url, method} = req;
	const timeNow = new Date().getFullYear();
	console.log(`a ${method} METHOD request was made from URL : ${url} at : ${timeNow}`);
	next(); //invoke the next middleware.
}

module.exports = logger; 