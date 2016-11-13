const fs = require("fs");

function generator(rootdir) {
	// Make a function to load a file
	const load_file = function(_, string) {
		try {
			return fs.readFileSync(rootdir + string.trim(), 'utf8');
		}

		catch (err) {
			console.log("Couldn't load " + string + " in " + rootdir);
			return "";
		}
	}

	// The generator function that loads files from root dir
	return function (filename, substitutions) {
		try {
			return fs.readFileSync(rootdir + filename.trim(), 'utf8')
			.replace(/<<<([^>]+)>>>/g, load_file)
			.replace(/{{{([^\}]+)}}}/g, function(_, string) { return substitutions[string.trim()] });
		}

		catch(err) {
			console.log("Couldn't find/access " + filename + " in " + rootdir);
			return "404 file not found";
		}
	}
}

module.exports = generator;