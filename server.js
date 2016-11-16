const config 	   = require("./config.json");
const http_server  = require("./src/http-server.js");
const https_server = require("./src/https-server.js");
const app 		   = require("./src/app.js");

if (config.use_ssl == true) {
	https_server(app);
}

else {
	http_server(app);
}