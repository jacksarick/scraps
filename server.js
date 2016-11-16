const config 	   = require("./config.json");
const http_server  = require("./src/http-server.js");
const https_server = require("./src/https-server.js");
const app 		   = require("./src/app.js");
const log 		   = require("./log.js");


if (config.use_ssl == true) {
	log.sys("Started server on port " + config.port + " with SSL")
	https_server(app);
}

else {
	log.sys("Started server on port " + config.port + " without SSL")
	http_server(app);
}