const http = require('http');
const log  = require("./log.js");


const config = require("../config.json");
const HOST = config.host;
const PORT = config.port;

function server_generator(handler) {
	return server = http.createServer(handler).listen(PORT, function(){
		log.sys("Listening on: http://" + HOST + ":" + PORT);
	});
}

module.exports = server_generator;