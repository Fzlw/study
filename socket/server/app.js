const WebSocket = require('ws');
const http = require('http');
const server = http.createServer().listen(6000);


new WebSocket.Server({
  host: '127.0.0.1',
  port: 6000,
  server
}, (...args) => {
  console.log(args)
})