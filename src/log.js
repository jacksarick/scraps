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
//; message: obj -> worked: bool
function print(msg) {
	if (config.logging == true) {
		fs.appendFile(config.log_file, msg, {'flags': 'a+'}, function(err) {
			console.log("FAIL: CAN'T LOG TO FILE, INCLUDING THIS ERROR", err);
		});
	}

	console.log(msg);
}

//; General log function
//; message: obj -> worked:bool
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