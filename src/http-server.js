//; Simple http server generator


// Load tools
const http = require('http');
const log  = require("./log.js");

// Import config
const config = require("../config.json");
const HOST = config.host;
const PORT = config.port;

//; Simple http server
//; handler: func -> server: func
function server_generator(handler) {
	return server = http.createServer(handler).listen(PORT, function(){
		log.sys("Listening on: http://" + HOST + ":" + PORT);
	});
}

module.exports = server_generator;