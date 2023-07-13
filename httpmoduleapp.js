const http = require("http");
const {readFileSync} = require('fs');

const server = http.createServer();

server.on("request", (req, res) => {
  console.log(`a ${req.method} METHOD Request was made from URL : ${req.url}`); //istek yapılan url adresi

  if (req.url == "/") {
    console.log("Home Page"); //Al sana routing
	res.writeHead(200, { "content-type": "text/html" });
  	res.write(homePage); //We dont send the file, we send the content of the file.
  	res.end();
  } 
  else if (req.url == "/about") {
    console.log("About Page is requested");
  } 
  else {
    //If there is no url match
    res.writeHead(404, { "content-type": "text/html" });
    res.end(`
		<h1> Routing Error </h1>
		<p> This page doesnt exist. Please go back home and navigate from there!!! </p>
		<a href="/"> Go Home</a>
		`);
    return;
  }
});

server.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});

const EventEmitter = require("events");
const customEmitter = new EventEmitter();
customEmitter.on("response", (name, id) => {
  console.log(`Data received name: ${name} and id : ${id}`);
}); // I can copy this and paste as much as I want. They will all be triggered.
customEmitter.emit("response", "husoka", 35); //If I emit the event before I listen it, nothing will happen. I should first listen and then emit. So, the order matters.

const homePage = readFileSync('./index.html');