const fs  = require("fs");
const log = require("./log.js");

function database(rootdir) {
	
	const filesystem = {
		save: function(content) {
			const token = Math.random().toString(36).substr(2, 8);
			const date = Math.floor(Date.now() / 1000);

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

			const now = Math.floor(Date.now() / 1000);
			const body = expiry + "\n---\n" + now + "\n---\n" + content;
			fs.writeFileSync(rootdir + token, body, 'utf8', {flags: 'wx+'});

			const args = {
				"title": token.trim(),
				"content": content.trim(),
				"date": date.trim() / (60 * 60)
			};
			
			return args;
		}
	}
	
	return filesystem;
}

module.exports = database;