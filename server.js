const config = require("./config.json");
const http_server = require("./src/http-server.js");
const app = require("./src/app.js");

http_server(app);