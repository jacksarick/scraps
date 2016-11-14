const http = require('http');

const config = require("../config.json");
const PORT = config.port;

function server_generator(handler) {
	return server = http.createServer(handler).listen(PORT, function(){
		console.log("Listening on: http://localhost:" + PORT);
	});
}

module.exports = server_generator;