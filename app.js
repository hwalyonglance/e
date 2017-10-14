var http = require('http');
var path = require('path');
var fs = require('fs');
var express = require('express');
var io = require('socket.io');
var socket
var siofu = require("socketio-file-upload");
var app = express();
    // .use(siofu.router)

app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'public')));


// app.get('/', (req, res) => {

// })

var server = http.createServer(app)
var $Socket = io(server);

require('./db')($Socket)

$Socket.of('/cate').on("connection", function(_socket){
		var uploader = new siofu();
		uploader.dir = path.join(__dirname, 'public', 'uploads');
		uploader.listen(_socket);
		uploader.on("saved", function(event){
			console.log(event)
			const ext = event.file.name.split('.');
			console.log(event.file.base + '.' + ext[ ext.length - 1 ])
		});
		console.log('/cate')
});
$Socket.of('/item').on('connection', (_socket) => {
	console.log('/item')
})

$Socket.on('connect', function(_socket) {
	console.log('connect', _socket)
})

server.listen(3000)
server.on('listening', () => {
	console.log('http://localhost:3000');
});

