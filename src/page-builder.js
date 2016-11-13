const fs = require("fs");

function load_file(match, string) {
	try {
		return fs.readFileSync(string, 'utf8');
	}

	catch (err) {
		""
	}
}

function main(filename, substitutions) {
	try {
		return fs.readFileSync(filename, 'utf8').replace(/<<<([^>]+)>>>/g, load_file).replace(/{{{([^\}]+)}}}/g, function(match) { return substitutions[match] });
	}

	catch(err) {
		console.log("Couldn't find/access " + filename);
		return "404 file not found";
	}
}

module.exports = main;