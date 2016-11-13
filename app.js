var   http = require('http');
const PORT = 8080;

var compose = require("./src/page-builder.js")(__dirname + "/pages/");

function handler(request, response){
	// const url = (request.url == "/")? "index.html" : request.url;
	// response.end(compose(url, {"variable":"This is some dope content!!!!"}));
	switch(request.url) {
		case "/":
		case "/index.html":
			response.end(compose("index.html"));
			break;

		case "/new":
			response.end(compose("new.html"));

		default:
			response.writeHead(404, {'Content-Type': 'text/html'});
			response.end(compose("404.html", {"file": request.url}));
			break;
	}
}

var server = http.createServer(handler);

server.listen(PORT, function(){
	console.log("Listening on: http://localhost:" + PORT);
});