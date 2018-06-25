//; Logging functions
const fs = require('fs');
const config = require("../config.json");

const colour = function(clr, string) {
	const colours = {
		"default": "\x1b[39m",
		"red"	 : "\x1b[31m",
		"yellow" : "\x1b[33m",
		"blue"	 : "\x1b[34m",
		"green"	 : "\x1b[32m"
	}

	return colours[clr] + string + "\x1b[0m"
}

//; Print function that copies to log
//; message: obj -> nil
function print(msg, clr) {
	msg = new Date().toLocaleString('en-GB') + msg

	if (config.logging == true) {
		fs.appendFile(config.log_file, msg + "\n", {'flags': 'a+'}, (err) => {
			if (err) {
				console.log("FAIL: CAN'T LOG TO FILE, INCLUDING THIS ERROR", err);
			}
		});
	}

	console.log(colour(clr, msg));
}

//; General log function
//; message: obj -> worked:bool
const log = {
	sys: function(msg) {
		print(" SYS: " + msg, "blue");
	},

	info: function(msg) {
		print(" INFO: " + msg, "default");
	},

	err: function(msg) {
		print(" ERR: " + msg, "red");
	},

	warn: function(msg) {
		print(" WARN: " + msg, "yellow");
	},
}

module.exports = log;