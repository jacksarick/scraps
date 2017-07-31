# Beachball⛱

Like pastebin, but expiries are based on visits. Say you set expiry to one hour, if no one visits it within an hour, then it goes away. But every time someone visits it, that hour gets renewed. Perfect for all those times a sensitive chunk of text needs to get passed around, but it's hard to co-ordinate exact times.

This project was made in a single weekend, as simple project I could complete in a short time frame. I have since revisited it to make minor modifications for easier deployment on servers.

## Setup

Setup is dead simple.

```bash
git clone https://github.com/jacksarick/beachball.git; # clone the repo
cd beachball; # go to the folder
npm install; # build the server
npm test; # test your configuration
npm start # start the server
```

Boom. Done. Your server is now up, running, and fully configured at <http://localhost:8080>.

Alternatively, download the latest release via the "release" tab on github.

If you want HTTPS, run `./gen-cert.sh` (or simply select y during installation), and change `use_ssl` in `config.json` to `true`. It will be self-signed, so you'll need to add `localhost` as an exception for most browsers. Quite frankly, I don't suggest this, even the demo server is running HTTP behind an nginx proxy. It's not insecure, but it's just a little hard to maintain.

When you make changes and want to see if your general layout works, run `npm test`. It won't check everything, but it should cover some basics. Yes, I wrote the test in TCL, it's a good language.

## Customizing
To change the port, the location of stored text files, or the location of webpages, edit `config.json` as you see fit. SSL should be pretty straight forward, but I haven't done much testing. The `host` parameter in `config.json` does not actually affect the server, and is only implemented for loggin purposes.

### Editing Pages
If you don't like my pages (I'm not exactly a designer, I know), go to the `public` directory and edit whatever you like. You'll notice a big difference: The server can't handle file requests. CSS files can't be included via requests. As such, I've implemented an include system. Any file in `<<< >>>` will be "imported". For example:

**`main.html`:**

```html
<div>
	<<< mixin.html >>>
</div>
```

**`mixin.html`:**

```html
<b>I'm some content</b>
```

`main.html` will output:

```html
<div>
	<b>I'm some content</b>
</div>
```

When called. Coolio!

I added another cool templating feature. Things wrapped in `{{{ }}}` will be swapped for their corresponding variable.

**`main.html`:**

```html
<h1>{{{ title }}}</h1>
<div>
	{{{ content }}}
</div>
```

In the server, you might have something like:

```javascript
compose("main.html", {"title": "Hello!", "content": "More stuff here"}
```

Which would output:

```html
<h1>Hello!</h1>
<div>
	More stuff here
</div>
```

The whole system is designed to be mostly painless and intuitive on the surface. To make any actual changes will require actual code. Sorry. 

## Maintenance and Usage
I consider this a completed project, so I do almost no work on it. If you find a bug please let me know, but odds are I won't fix it for a while, if ever. Feel free to submit a pull request, I'll probably accept it if it's good. In the event you start up your own instance, modified or plain, let me know! I'll be excited that someone is using it.
