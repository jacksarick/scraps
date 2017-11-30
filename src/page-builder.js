const fs = require("fs");
const log 	= require("./log.js");

function generator(rootdir) {
	// Make a function to load a file
	const load_file = function(_, string) {
		try {
			return compose(string.trim(), 'utf8');
		}

		catch (err) {
			log.err("Couldn't find/access " + string + " from " + rootdir);
			return "";
		}
	}

	// The generator function that loads files from root dir
	const compose = function (filename, substitutions) {
		try {
			return fs.readFileSync(rootdir + filename.trim(), 'utf8')
			.replace(/<<<([^>]+)>>>/g, load_file)
			.replace(/{{{([^\}]+)}}}/g, function(_, string) { return substitutions[string.trim()] });
		}

		catch(err) {
			log.err("Couldn't find/access " + filename + " from " + rootdir);
			return compose("404.html", {"file": filename});
		}
	}

	return compose;
}

module.exports = generator;