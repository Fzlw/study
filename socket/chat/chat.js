const http = require('http');
const fs = require('fs');

const server = http.createServer(function(req, res) {
    let file = fs.readFileSync(__dirname + '/index.html');
    res.end(file);
}).listen(7001);

let io = require('socket.io')(server);
io.on('connection', function(socket) {
    console.log('one');
    // 监听客户端套接字事件
    socket.on('fa', function(msg) {
        // socket.emit('server', 'ok')
        // 广播
        // io.emit('server', msg);
        // 除某个套接字外广播
        socket.broadcast.emit('server', msg);
        console.log('client:' + msg);
    })
})