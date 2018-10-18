const Controller = require('egg').Controller;
const uuid = require('uuid');
const WebSocket = require('ws');
const wss = new WebSocket.Server({
    port: 8080
});
const users = [];

class HomeController extends Controller {
    async index() {
        // this.ctx.body = 'Hello world';
        await this.ctx.render('game/flappybird.xtpl');
    }

    // faye-websocket
    async testsocket() {
        var WebSocket = require('faye-websocket'),
            http = require('http');

        var server = http.createServer();

        server.on('upgrade', function (request, socket, body) {
            if (WebSocket.isWebSocket(request)) {
                var ws = new WebSocket(request, socket, body);
                console.log("request come...");
                ws.on('message', function (event) {
                    console.log("message receive...")
                    ws.send(event.data);
                });

                ws.on('close', function (event) {
                    console.log('close', event.code, event.reason);
                    ws = null;
                });

                setInterval(() => {
                    ws.send('faye-websocket')
                }, 2000); // 定时器，每间隔 2s 发送一个 "data"
            }
        });

        server.listen(8001);
        console.log("server start...")
        await this.ctx.render('socket/index.xtpl');
    }

    // 基于ws + nodejs 搭建socket服务
    async ws() {

        let i = 0,
            prev = null,
            data = null;



        wss.on('connection', function connection(ws, req) {
            
            users.push(ws);

            // if (users.indexOf()) {

            // }


            // let send = (d) => {
            //     console.log(users.length)
            //     users.forEach(_ws => {
            //         if (_ws) {
            //             _ws.send(d);
            //         }
            //     })
            // }

            setInterval(() => {
                // prev = data;
                data -= 1;
                ws.send(data);
            }, 2000)

        });



        this.ctx.body = "hi ws";
    }
}

module.exports = HomeController;