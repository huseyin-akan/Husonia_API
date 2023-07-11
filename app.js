const http = require('http'); 
const server = http.createServer( (req, res) => {
	console.log(req.url) //istek yapılan url adresi
	if(req.url == '/') console.log('Home Page') //Al sana routing
	res.write('Huso kissed ya!');
	res.end();
});
server.listen(5000); //listens port :5000