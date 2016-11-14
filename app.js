var   http = require('http');
const PORT = 8080;

const compose  = require("./src/page-builder.js")(__dirname + "/pages/");
const database = require("./src/database.js")(__dirname + "/db/"); 

function file_not_found(res, file) {
	res.writeHead(404, {'Content-Type': 'text/html'});
	res.end(compose("404.html", {"file": file}));
}

function handler(request, response){
	
	if (request.method == "POST") {
		var body;

		request.on('data', function (data) {
			body = data + [];
		});

		request.on('end', function() {

			[content, timer] = body.split("&");
			content = decodeURIComponent(content.replace("content=", "").replace(/\+/g, " "));
			timer = timer.replace("timer=", "") * 60 * 60;
			const location = database.save(content, timer);
			
			if (location){
				response.writeHead(302, {'Location': "/f/" + location});
				response.end("Success!");
			}

			else {
				response.end(compose("generic.html", {"title": "Uh Oh!", "content": "Something went wrong :("}));
			}
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
					const token = request.url.split("/")[2];
					if (database.check(token)) {
						const file = database.load(token);
						if (file) {
							response.end(compose("text-file.html", file));

						}
					}

					else {
						file_not_found(response, token);
					}

				}

				if (/\/f\?\/.+/.test(request.url)) {
					const token = request.url.split("/")[2];
					const check = database.check(token);
					if (check) {
						response.end(compose("generic.html", {"title": token, "content": `Expires in ${check} hour`}));
					}

					else {
						file_not_found(response, token);
					}

				}

				else {
					file_not_found(response, request.url);
				}

				break;
		}
	}
}

var server = http.createServer(handler);

server.listen(PORT, function(){
	console.log("Listening on: http://localhost:" + PORT);
});