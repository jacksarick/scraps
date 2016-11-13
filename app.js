var   http = require('http');
const PORT = 8080;

var compose = require("./src/page-builder.js")(__dirname + "/pages/");

var database = {};

function handler(request, response){
	
	if (request.method == "POST") {
		var body;

		request.on('data', function (data) {
			body = data + [];
		});

		request.on('end', function() {
			const token = Math.random().toString(36).substr(2, 12);
			database[token] = decodeURIComponent(body.replace("content=", "").replace(/\+/g, " "));

			response.writeHead(302, {'Location': "/f/" + token});
			response.end("Success!");
		});
	}

	else {
		switch(request.url) {
			case "/":
			case "/index.html":
				response.end(compose("index.html"));
				break;

			case "/new":
				response.end(compose("new.html"));
				break;

			default:
				if (/\/f\/.+/.test(request.url)) {
					const title = request.url.split("/")[2];
					response.end(compose("text-file.html", {"title": title, "content": database[title], "timer": "1 week"}));

				}

				else {
					response.writeHead(404, {'Content-Type': 'text/html'});
					response.end(compose("404.html", {"file": request.url}));
				}
				break;
		}
	}
}

var server = http.createServer(handler);

server.listen(PORT, function(){
	console.log("Listening on: http://localhost:" + PORT);
});