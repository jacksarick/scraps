const fs 	= require('fs');
const https = require('https');
const log 	= require("./log.js");


const config = require("../config.json");
const PORT = config.port;

function server_generator(handler) {
	const options = {
		key: fs.readFileSync(config.ssl.key),
		cert: fs.readFileSync(config.ssl.cert)
	};

	return server = https.createServer(options, handler).listen(PORT, function(){
		log.sys("Listening on: https://localhost:" + PORT);
	});
}

module.exports = server_generator;