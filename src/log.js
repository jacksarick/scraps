//; Logging functions
const fs = require('fs');
const config = require("../config.json");

const colour = function(clr, string) {
	const colours = {
		"red"	: "\x1b[31m",
		"yellow": "\x1b[33m",
		"blue"	: "\x1b[34m",
		"green"	: "\x1b[32m"
	}

	return colours[clr] + string + "\x1b[0m"
}

//; Print function that copies to log
function print(msg) {
	if (config.loggging == true) {
		fs.appendFile('scraps-server.log', msg, {'flags': 'wa+'}, function(err) {
			console.log("ERROR: CAN'T LOG TO FILE, INCLUDING THIS ERROR", err);
		});
	}

	console.log(msg);
}

const log = {
	sys: function(msg) {
		print(colour("blue", " SYS: " + msg));
	},

	info: function(msg) {
		print("INFO: " + msg);
	},

	err: function(msg) {
		print(colour("red", " ERR: " + msg));
	},

	warn: function(msg) {
		print(colour("yellow", "WARN: " + msg));
	},
}

module.exports = log;