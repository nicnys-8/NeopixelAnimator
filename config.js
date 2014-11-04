
var servers = {
    "server" : {
        "port" : 8001,
        "host" : "http://localhost"
    }
};

(function() {
    var i, server;
    for (i in servers) {
        server = servers[i];
        server.url = server.host + ":" + server.port;
    }
}());

module.exports = servers;
