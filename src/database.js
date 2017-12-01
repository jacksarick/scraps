const fs  = require("fs");
const log = require("./log.js");

function database(rootdir) {
	
	const filesystem = {
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

		load: function(token) {
			const file = fs.readFileSync(rootdir + token, 'utf8');
			[date, content] = file.split("---");

			const args = {
				"title": token.trim(),
				"content": content.trim(),
				"date": date.trim()
			};
			
			return args;
		},

		index: function(lines = 0) {
			var tokens = fs.readdirSync(rootdir);
			if (lines){
				var tokens = tokens.map((token) => [token, this.load(token)]).sort((a, b) => {
					return Date(a[1]["date"]) > Date(b[1]["date"])
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