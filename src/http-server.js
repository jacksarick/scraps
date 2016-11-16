const http = require('http');
const log  = require("./log.js");


const config = require("../config.json");
const PORT = config.port;

function server_generator(handler) {
	return server = http.createServer(handler).listen(PORT, function(){
		log.sys("Listening on: http://localhost:" + PORT);
	});
}

module.exports = server_generator;