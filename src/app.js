const config = require("../config.json");
const log 	 = require("./log.js");


const compose  = require("./page-builder.js")(config.page_root);
const database = require("./database.js")(config.database_root);

function file_not_found(res, file) {
	log.warn("File not found: " + file);
	res.writeHead(404, {'Content-Type': 'text/html'});
	res.end(compose("404.html", {"file": file}));
}

function app(request, response){

	const user = request.connection.remoteAddress;
	
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

	else {
		log.info("Request for " + request.url + " by " + user);
		switch(request.url) {
			case "/":
			case "/index.html":
				const files = database.index(1).map((file) => {
					return `<li><a href="./f/${file[0]}">${file[0]}</a>: ${file[1]}</li>`;
				});
				response.end(compose("index.html", {"list": files.join("\n")}));
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

				else {
					file_not_found(response, request.url);
				}

				break;
		}
	}
}

module.exports = app