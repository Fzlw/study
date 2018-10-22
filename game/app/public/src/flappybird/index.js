/**
 * 管子缺少一帧没有绘制  
 * 因为数组长度的突然变化导致的
 * 
 * 做小鸟的动画   OK
 */
class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.init();
    }

    init() {
        // 存放静态资源
        this.R = {};
        // 帧编号
        this.fNo = 0;
        // 0-9数字的信息
        this.grade = {
            n_0: [992, 121, 24, 36],
            n_1: [272, 911, 24, 36],
            n_2: [584, 320, 24, 36],
            n_3: [612, 320, 24, 36],
            n_4: [640, 320, 24, 36],
            n_5: [668, 320, 24, 36],
            n_6: [584, 368, 24, 36],
            n_7: [612, 368, 24, 36],
            n_8: [640, 368, 24, 36],
            n_9: [668, 368, 24, 36],
            w: 24,
            h: 36
        }
        this.userGrade = [];
        this.fitScreen()
        this.load();
        this.bindEvent();
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
            images
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
                    this.sceneManage(2);
                    // this.test()
                }
            }
            img.src = baseUrl + item.url;
        });
    }

    /**
     * 场景管理器
     */
    sceneManage(state, options) {
        this.state = state;
        switch (state) {
            case 1:
                this.state1();
                break;
            case 2:
                this.state2();
                // this.start()
                break;
            case 3:
                this.start();
                this.bird.fly();
                break;
            case 4:
                this.state4(options);
                break;
        }
    }

    state1() {
        // 获取常量
        const data = this.getData();
        let logo = {
                position: [702, 183],
                size: [178, 48],
                h: 0
            },
            startBtn = {
                position: [708, 237],
                size: [104, 58],
                h: data.HEIGHT * data.SLICE
            },
            // 小鸟拍打翅膀度动作
            bird = {
                a_0: [231, 659],
                a_1: [230, 710],
                a_2: [174, 982],
                index: 0,
                h: 114 + data.entranceWidth / 2,
                speed: 1
            },
            fNo = 0;
        // 实例化背景
        let back = new BackGround(this.ctx, this.R, data);
        // 实例化大地
        let land = new Land(this.ctx, this.R, data);
        setInterval(() => {
            // 清屏
            this.ctx.clearRect(0, 0, data.WIDTH, data.HEIGHT);
            // 更新背景
            back.update();

            this.ctx.drawImage(this.R["allImg"], logo.position[0], logo.position[1], logo.size[0], logo.size[1], (data.WIDTH - logo.size[0]) / 2, logo.h, logo.size[0], logo.size[1]);
            this.ctx.drawImage(this.R["allImg"], startBtn.position[0], startBtn.position[1], startBtn.size[0], startBtn.size[1], (data.WIDTH - startBtn.size[0]) / 2, startBtn.h, startBtn.size[0], startBtn.size[1]);
            this.ctx.drawImage(this.R["allImg"], bird['a_' + bird.index][0], bird['a_' + bird.index][1], 34, 24, (data.WIDTH - 34) / 2, bird.h, 34, 24);

            // 更新大地
            land.update();

            if (startBtn.h - logo.h > data.entranceWidth) {
                logo.h += 2;
                startBtn.h -= 2;
            }
            if (bird.h > 114 + data.entranceWidth / 2 + 30) {
                bird.speed = -1;
            } else if (bird.h < 114 + data.entranceWidth / 2 - 30) {
                bird.speed = 1;
            }

            if (fNo % 10 === 0) {
                bird.index >= 2 ? bird.index = 0 : bird.index++;
            }
            bird.h += bird.speed
            fNo++;
        }, data.renderTime * 1000)
    }

    state2() {
        // 获取常量
        const data = this.getData();
        data.bcakSpeed = 0
        this.isClickCanvas = false;
        let zero = {
                position: [992, 121],
                size: [24, 36],
                h: 50
            },
            ready = {
                position: [590, 118],
                size: [184, 50],
                h: zero.h + zero.size[1] + 50
            },
            // 小鸟拍打翅膀度动作
            bird = {
                a_0: [231, 659],
                a_1: [230, 710],
                a_2: [174, 982],
                index: 0,
                h: zero.h + zero.size[1] + 50 + ready.size[1] + 100,
                speed: 1
            },
            tips = {
                position: [590, 183],
                size: [108, 98],
                h: zero.h + zero.size[1] + 50 + ready.size[1] + 100
            },
            opcity = 100,
            fNo = 0;
        // 实例化背景
        let back = new BackGround(this.ctx, this.R, data);
        // 实例化大地
        let land = new Land(this.ctx, this.R, data);
        let t = setInterval(() => {
            // 清屏
            this.ctx.clearRect(0, 0, data.WIDTH, data.HEIGHT);
            // 更新背景
            back.update();
            this.ctx.save();
            this.ctx.globalAlpha = opcity / 100;
            this.ctx.drawImage(this.R["allImg"], zero.position[0], zero.position[1], zero.size[0], zero.size[1], (data.WIDTH - zero.size[0]) / 2, zero.h, zero.size[0], zero.size[1]);
            this.ctx.drawImage(this.R["allImg"], ready.position[0], ready.position[1], ready.size[0], ready.size[1], (data.WIDTH - ready.size[0]) / 2, ready.h, ready.size[0], ready.size[1]);
            this.ctx.drawImage(this.R["allImg"], tips.position[0], tips.position[1], tips.size[0], tips.size[1], (data.WIDTH - tips.size[0]) / 2, tips.h, tips.size[0], tips.size[1]);
            this.ctx.drawImage(this.R["allImg"], bird['a_' + bird.index][0], bird['a_' + bird.index][1], 34, 24, (data.WIDTH * (1 - data.SLICE)) / 2, bird.h, 34, 24);
            this.ctx.restore()
            // 更新大地
            land.update();

            if (bird.h > zero.h + zero.size[1] + 50 + ready.size[1] + 100 + 30) {
                bird.speed = -1;
            } else if (bird.h < zero.h + zero.size[1] + 50 + ready.size[1] + 100 - 30) {
                bird.speed = 1;
            }

            if (fNo % 10 === 0) {
                bird.index >= 2 ? bird.index = 0 : bird.index++;
            }
            if (this.isClickCanvas) {
                opcity -= 10;
            }
            if (opcity < 0) {
                clearInterval(t);
                this.sceneManage(3);
                return;
            }
            bird.h += bird.speed

            fNo++;
        }, data.renderTime * 1000)
    }

    // 游戏开始
    start() {
        // 存储管子的数组
        let pipeArr = [];
        // 得分
        let grade = 0;
        // 获取常量
        const data = this.getData();
        // 实例化背景
        let back = new BackGround(this.ctx, this.R, data);
        // 实例化大地
        let land = new Land(this.ctx, this.R, data);
        // 实例化管子
        // let pipe = new Pipe(this.ctx, this.R, data);
        // 实例化小鸟
        this.bird = new Bird(this.ctx, this.R, data);
        let isEnd = false;
        let timmer = setInterval(() => {
            // // 清屏
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            // 更新背景
            back.update();
            // 限制管子的出现频率
            if (this.fNo % 50 === 0 && !isEnd) {
                new Pipe(this.ctx, this.R, data, pipeArr, timmer);
            }
            // 更新小鸟
            this.ctx.save()
            // this.ctx.globalCompositeOperation = 'destination-in'
            let birdPosition = this.bird.update(this.fNo);
            this.ctx.restore()
            // 渲染管子
            if (pipeArr.length !== 0) {
                pipeArr.forEach(pipe => {
                    if (birdPosition[0] === 0 && birdPosition[1] === 0) {
                        isEnd = true;
                    }
                    let isPass = pipe.update(birdPosition);
                    // 返回0 表示小鸟和管子碰撞了，结束游戏
                    if (isPass === 0) {
                        isEnd = true;

                    }
                    if (isEnd) {
                        pipe.stop();
                    }
                    isPass && typeof isPass === "number" ? grade += isPass : grade += 0;
                })
            }
            // 更新大地
            land.update();
            // 更新分数
            this.renderGrade(grade);
            if (isEnd) {
                this.sceneManage(4, {
                    grade,
                    timmer,
                    land,
                    back
                });
            }

            // fNo
            this.ctx.fillStyle = "black";
            this.ctx.fillText(this.fNo, 0, 10);
            this.fNo++;
        }, data.renderTime * 1000);
    }

    state4(options) {
        let {
            grade,
            timmer,
            land,
            back
        } = options
        clearInterval(timmer);
        land.stop();
        back.stop();
        this.userGrade.push(grade);
        // 展示分数
        this.showGrade(grade);
    }

    // 常量
    getData() {
        return {
            G: 0.2, // 每帧小鸟的Y坐标变化量（下落加速度）
            SLICE: 0.618, // 屏幕分隔比例
            WIDTH: this.canvas.width, // 屏幕宽度
            HEIGHT: this.canvas.height, // 屏幕高度
            bcakSpeed: 1, // 背景移动速度
            landSpeed: 3, // 大地移动速度
            entranceWidth: 200, // 管子入口宽
            renderTime: 0.02 // 渲染时间间隔，单位s
        }
    }

    renderGrade(grade, end = false) {
        let str = grade.toString(),
            len = str.length,
            W = len * this.grade.w,
            centerX = !end ? (this.canvas.width - W) / 2 : 270,
            Y = !end ? 50 : 200,
            i = 0;
        while (i < len) {
            let self = this.grade['n_' + str[i]];
            this.ctx.drawImage(this.R["allImg"], self[0], self[1], self[2], self[3], centerX, Y, self[2], self[3]);
            centerX = centerX + self[2] + 4;
            i++;
        }
    }

    showGrade(grade) {
        // if (grade < 10) {
        //     alert('垃圾琼琼，才' + grade + '分');
        // } else if (grade > 15 && grade < 30) {
        //     alert('小琼琼居然还能拿' + grade + '分')
        // } else if (grade > 30) {
        //     alert('老婆超棒，得分' + grade + '分')
        // }
        let over = [790, 118, 192, 42],
            panel = [6, 519, 226, 114],
            startBtn = [708, 237, 104, 58];
        this.userGrade.sort((a, b) => b - a);
        this.ctx.drawImage(this.R["allImg"], over[0], over[1], over[2], over[3], (this.canvas.width - over[2]) / 2, 90, over[2], over[3]);
        this.ctx.drawImage(this.R["allImg"], panel[0], panel[1], panel[2], panel[3], (this.canvas.width - panel[2]) / 2, 110 + over[3], panel[2], panel[3]);
        this.ctx.drawImage(this.R["allImg"], startBtn[0], startBtn[1], startBtn[2], startBtn[3], (this.canvas.width - startBtn[2]) / 2, 130 + over[3] + panel[3], startBtn[2], startBtn[3]);
        this.ctx.fillStyle = "black"
        this.ctx.font = 15 + 'px Roboto-Medium'
        this.ctx.fillText(grade, 270, 200)
        this.ctx.fillText(this.userGrade[0] ? this.userGrade[0] : '', 270, 240)
        console.log(this.userGrade)
    }

    // 点击事件
    bindEvent() {
        let over = [790, 118, 192, 42],
            panel = [6, 519, 226, 114],
            startBtn = [708, 237, 104, 58];
        this.canvas.onclick = (e) => {
            if (this.state === 2) {
                this.isClickCanvas = true;
            }
            if (this.state === 3) {
                this.bird.fly();
            }
            if (this.state === 4) {
                let {
                    clientX,
                    clientY
                } = e;
                if (clientX > (this.canvas.width - startBtn[2]) / 2 && clientX < (this.canvas.width - startBtn[2]) / 2 + startBtn[2] &&
                    clientY > 130 + over[3] + panel[3] && clientY < 130 + over[3] + panel[3] + startBtn[3]) {
                    this.sceneManage(2)
                }
            }
        };
    }

    // 测试各种情况
    test() {
        this.ctx.strokeStyle = "red"
        this.ctx.strokeRect(50, 50, 100, 300);
        this.ctx.save();
        this.ctx.fillStyle = "yellow";
        this.ctx.translate(100, 200);
        this.ctx.rotate(Math.PI / 2);
        this.ctx.fillRect(-50, -150, 100, 300);
        this.ctx.restore();
    }
}


let canvas = document.getElementById("canvas");
let game = new Game(canvas)