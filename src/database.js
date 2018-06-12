// Load tools
const fs  = require("fs");
const log = require("./log.js");

//; Databse object
function database(rootdir) {
	
	//; <database> interaction functions
	const filesystem = {

		//; Token exits in db?
		//; token: string -> exits: bool
		check: function(token) {
			try {
				const file = fs.readFileSync(rootdir + token, 'utf8');
				[date] = file.split("---");

				return date.trim();
			}

			catch(err) {
					return false;
			}
		},


		//; Save string to file in db
		//; content: string -> token: string
		save: function(content) {
			const token = Math.random().toString(36).substr(2, 8);
			const date = new Date().toDateString();

			const body = date + "\n---\n" + content;

			try {
				fs.writeFileSync(rootdir + token, body, 'utf8', {flags: 'wx+'});
				return token;
			}

			catch (err) {
				log.err("Failed to save file because" + JSON.stringify(err));
				return undefined;
			}
		},

		//; Load file from token
		//; token: string -> {title, content, date}: string
		load: function(token) {
			const file = fs.readFileSync(rootdir + token, 'utf8');
			[date, content] = file.split("---");

			return {
				"title": token.trim(),
				"content": content.trim(),
				"date": date.trim()
			};
		},

		//; Return index of tokens (or first n)
		//; (n: int) -> tokens: [token: string, ...]
		index: function(lines = 0) {
			var tokens = fs.readdirSync(rootdir);
			if (lines){
				var tokens = tokens.map((token) => [token, this.load(token)]).sort((a, b) => {
					return new Date(b[1]["date"]) - new Date(a[1]["date"])
				}).map((file) => {
					return [file[0], file[1]["content"].split("<br>")[0]];
				});
			}

			return tokens;
		},
	}
	
	return filesystem;
}

module.exports = database;