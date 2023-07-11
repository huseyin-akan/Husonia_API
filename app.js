const http = require('http'); 
const server = http.createServer( (req, res) => {
	console.log(req.url) //istek yapılan url adresi
	if(req.url == '/') console.log('Home Page') //Al sana routing
	else if(req.url == '/about') console.log('About Page is rquested') //Al sana routing
	else { //If there is no url match 
		res.end(`
		<h1> Routing Error </h1>
		<p> This page doesnt exist. Please go back home and navigate from there!!! </p>
		<a href="/"> Go Home</a>
		`);
		return;
	}
	
	res.write('Huso kissed ya!');
	res.end();
});
server.listen(5000, () => {
	console.log('Server is listening on port 5000...');
}); 