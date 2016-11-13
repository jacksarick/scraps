var   http = require('http');
const PORT = 8080;

const compose = require("./src/page-builder.js")

function handler(request, response){
	const url = (request.url == "/")? "/index.html" : request.url;
	response.end(compose(__dirname + "/pages" + url));
}

var server = http.createServer(handler);

server.listen(PORT, function(){
	console.log("Listening on: http://localhost:" + PORT);
});