
var config      = require("./config"),
    port        = config.server.port,
    http        = require("http"),
    express     = require("express"),
    app         = express(),
    webServer;

// Setup and configure Express http server. Expect a subfolder called "static" to be the web root.
app.use(express.static(__dirname + "/static/"));

// Start Express http server
webServer = http.createServer(app).listen(port);
