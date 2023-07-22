const notFound = (req, res) => {
  res.status(404).send(`
	<h1> Routing Error </h1>
	<p> This page doesnt exist. Please go back home and navigate from there!!! </p>
	<a href="/"> Go Home</a>
	`);
};

module.exports = notFound;
