var ws = require("nodejs-websocket");
var dgram = require('dgram');

var server = ws.createServer().listen(8080)

server.broadcast = function broadcast(data) {
  server.connections.forEach(function each(client) {
    client.sendText(data);
  });
};

var udpServer = dgram.createSocket('udp4');
udpServer.on('message', function (message, remote) {
  server.broadcast(message);
});
udpServer.bind(33333);
