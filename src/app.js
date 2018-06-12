//; Primary handler and application

// Load tools
const config = require("../config.json");
const log 	 = require("./log.js");

// Load modules
const compose  = require("./page-builder.js")(config.page_root);
const database = require("./database.js")(config.database_root);

// Simple 404 function
function file_not_found(res, file) {
	log.warn("File not found: " + file);
	res.writeHead(404, {'Content-Type': 'text/html'});
	res.end(compose("404.html", {"file": file}));
}

// Primary application
function app(request, response){

	const user = request.connection.remoteAddress;
	
	// Handle user input
	if (request.method == "POST") {
		var body;

		request.on('data', function (data) {
			body = data + [];
		});

		request.on('end', function() {

			[content] = body.split("&");
			content = content.replace("content=", "").replace(/\+/g, " ");
			content = decodeURIComponent(content);
			const location = database.save(content);
			
			if (location){
				log.info(location + " made by " + user)
				response.writeHead(302, {'Location': "/f/" + location});
				response.end("Success!");
			}

			else {
				const content = {
					"title": "Uh Oh!",
					"content": "Something went wrong :("
				};

				response.end(compose("generic.html", content));
			}
		});
	}

	// Page routing
	else { //TODO: Check to see if it is a get request
		log.info("Request for " + request.url + " by " + user);
		
		// Routing
		switch(request.url) {
			// Index is assumed
			case "/":
			case "/index.html":
				const files = database.index(1).map((file) => {
					return `<li><code><a href="./f/${file[0]}">${file[0]}</a>:</code> ${file[1]} ...</li>`;
				});
				response.end(compose("index.html", {"list": files.join("\n")}));
				break;

			case "/new":
				response.end(compose("new.html"));
				break;

			// Default behaviour is db lookup
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

				//-{
				// else if (/\/f\?\/.+/.test(request.url)) {
				// 	const token = request.url.split("/")[2];
				// 	const check = database.check(token);
				// 	if (check) {
				// 		const content = {
				// 			"title": token,
				// 			"date": `written ${date}`
				// 		};

				// 		response.end(compose("generic.html", content));
				// 	}

				// 	else {
				// 		file_not_found(response, token);
				// 	}
				// }
				// ^No idea what this code is
				//}-

				// If it can't be accessed for any reason, 404
				else {
					file_not_found(response, request.url);
				}

				break;
		}
	}
}

module.exports = app