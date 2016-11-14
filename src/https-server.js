const fs  = require('fs');
const tls = require('tls');

const config = require("../config.json");
const PORT = config.port;

function server_generator(handler) {
	const options = {
		key: fs.readFileSync(config.ssl.key),
		cert: fs.readFileSync(config.ssl.cert)
	};

	return server = tls.createServer(options, (handler).listen(PORT, function(){
		console.log("Listening on: http://localhost:" + PORT);
	});
}

module.exports = server_generator;