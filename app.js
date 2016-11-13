var   http = require('http');
const PORT = 8080;

const compose = require("./src/page-builder.js")(__dirname + "/pages/");
const databae = require("./src/database.js")(__dirname + "/db/"); 

function handler(request, response){
	
	if (request.method == "POST") {
		var body;

		request.on('data', function (data) {
			body = data + [];
		});

		request.on('end', function() {

			[content, timer] = body.split("&");
			content = decodeURIComponent(content.replace("content=", "").replace(/\+/g, " "));
			timer = timer.replace("timer=", "") * 1;
			const location = save_content(content, timer);
			
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
					if (database[title] != undefined) {
						response.end(compose("text-file.html", {"title": title, "content": database[title]["content"], "timer": database[title]["time"]}));
					}

					else {
						response.writeHead(404, {'Content-Type': 'text/html'});
						response.end(compose("404.html", {"file": title}));
					}

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