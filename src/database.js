const fs = require("fs");

function database(rootdir) {
	
	const filesystem = {
		check: function(token) {
			try {
				const file = fs.readFileSync(rootdir + token, 'utf8');
				[expiry, date] = file.split("---");
				[expiry, date] = [expiry.trim() * 1, date.trim() * 1];
				
				const now = Math.floor(Date.now() / 1000);

				if ((date + expiry) < now) {
					fs.unlinkSync(rootdir + token);
					return false;
				}

				return expiry;
			}

			catch(err) {
				return false;
			}
		},

		save: function(content, expiry) {
			const token = Math.random().toString(36).substr(2, 8);
			const now = Math.floor(Date.now() / 1000);

			const body = expiry + "\n---\n" + now + "\n---\n" + content;

			try {
				fs.writeFileSync(rootdir + token, body, 'utf8', {flags: 'wx+'});
				return token;
			}

			catch (err) {
				console.log(err);
				return undefined;
			}
		},

		load: function(token) {
			const file = fs.readFileSync(rootdir + token, 'utf8');
			[expiry, date, content] = file.split("---");
			const args = {"title": token.trim(), "content": content.trim(), "timer": expiry.trim() / (60 * 60)};
			return args;
		}
	}
	
	return filesystem;
}

module.exports = database;