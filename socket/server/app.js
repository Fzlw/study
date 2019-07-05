const WebSocket = require('ws');
const http = require('http');
// const server = http.createServer().listen(3000);
let count = 0;

const ws = new WebSocket.Server({
  noServer: true,
  port: 3000
});

ws.on('listening', () => {
  console.log('启动...')
})
ws.on('connection', newConnect => {
  count ++;
  console.log('连接成功: 第%d个', count);
  newConnect.send('Welcoming...')

  newConnect.on('message', data => {
    console.log(data)
  })
})