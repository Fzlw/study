
class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.init();
    }

    init() {
        // 存放静态资源
        this.R = {};
        this.fitScreen()
        this.load();
    }

    // 适配屏幕
    fitScreen() {
        let width = document.documentElement.clientWidth,
            height = document.documentElement.clientHeight;
        width = width > 414 ? 414 : width;
        width = width < 320 ? 320 : width;
        height = height > 736 ? 736 : height;
        height = height < 500 ? 500 : height;


        this.canvas.width = width;
        this.canvas.height = height;
    }

    // 加载json文件，包含静态资源路径
    load() {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                this.loadResource(xhr.responseText);
            }
        }
        xhr.open("GET", "../../public/src/flappybird/resource.json", true);
        xhr.send();
    }

    // 加载静态资源
    loadResource(json) {
        let {
            baseUrl,
            images,
            js
        } = JSON.parse(json),
            count = 0,
            len = images.length;
        images.forEach(item => {
            let img = new Image();
            img.onload = () => {
                count += 1;
                this.R[item.name] = img;

                this.ctx.fillStyle = "black"
                this.ctx.fillText("123456", 0, 10);
                if (count === len) {
                    this.start();
                }
            }
            img.src = baseUrl + item.url;
        });
    }

    // 游戏开始
    start() {
        let back = new BackGround(this.ctx, this.R, this.getData());
        setInterval(() => {
            // 清屏
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            back.update();
        }, 20);
    }

    // 常量
    getData() {
        return {
            G: 9.8,    // 下落加速度
            SLICE: 0.618,    // 屏幕分隔比例
            WIDTH: this.canvas.width,    // 屏幕宽度
            HEIGHT: this.canvas.height,   // 屏幕高度
            bcakSpeed: 1,  // 背景移动速度
            landSpeed: 3   // 大地移动速度
        }
    }
}


let canvas = document.getElementById("canvas");
let game = new Game(canvas)
