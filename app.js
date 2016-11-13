var   http = require('http');
const PORT = 8080;

var compose = require("./src/page-builder.js")(__dirname + "/pages/");

function handler(request, response){
	const url = (request.url == "/")? "index.html" : request.url;
	response.end(compose(url, {"variable":"This is some dope content!!!!"}));
}

var server = http.createServer(handler);

server.listen(PORT, function(){
	console.log("Listening on: http://localhost:" + PORT);
});