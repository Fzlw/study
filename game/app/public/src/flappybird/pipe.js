/**
 * 碰撞模型采用AABB盒模型，理解为小鸟就是一个只会上下动的盒子
 * 后续优化可以加入角度的计算
 */

class Pipe {
    constructor(ctx, R, data, pipeArr, timmer) {
        this.ctx = ctx;
        this.data = data;
        this.pipeArr = pipeArr; // 存储管子实例的数组
        this.timmer = timmer; // 定时器指针
        this.img = R["allImg"];
        this.pipeSpeed = data.landSpeed; // 管子移动速度，和大地移速一样
        this.entranceWidth = data.entranceWidth; // 管子的入口宽度
        this.upPipe = {
            position: [112, 646],
            size: [52, 320]
        };
        this.downPipe = {
            position: [169, 646],
            size: [52, 320]
        };
        this.init();
    }

    init() {
        const sH = this.upPipe.size[1],
            baseH = -(sH - 100);
        this.birdSize = [34, 24]; // 小鸟的大小
        this.startX = this.data.WIDTH + 288; // 管子的起始X坐标  + 背景宽
        this.posY_u = baseH + parseInt(Math.random() * 150);
        this.posY_d = sH - Math.abs(this.posY_u) + this.entranceWidth;
        this.isPassed = false;
        this.pipeArr.push(this);
    }

    create() {
        const sx_u = this.upPipe.position[0],
            sy_u = this.upPipe.position[1],
            sW = this.upPipe.size[0],
            sH = this.upPipe.size[1],
            sx_d = this.downPipe.position[0],
            sy_d = this.downPipe.position[1];
        // 上管子
        this.ctx.drawImage(this.img, sx_u, sy_u, sW, sH, this.startX, this.posY_u, sW, sH);
        // 下管子
        this.ctx.drawImage(this.img, sx_d, sy_d, sW, sH, this.startX, this.posY_d, sW, sH);
    }

    /**
     * 
     * @param {number} birdY 小鸟盒模型左上角Y坐标
     */
    update(birdPosition) {
        this.startX = this.startX - this.pipeSpeed;
        // 如果消失就清除，突变的那一帧会缺失，所以消失一段距离后在删除 * 4
        if (this.startX <= -4 * this.upPipe.size[0]) {
            this.pipeArr.shift();
        }
        // 进行碰撞检测
        let isPass = this.checkTouch(birdPosition);
        this.create();
        return isPass;
    }

    /**
     * 碰撞检测
     * @param {arr} birdPosition 小鸟盒模型左上角XY坐标
     */
    checkTouch(birdPosition) {
        // 管子碰撞检测
        let pipe_u_y = this.posY_u + this.upPipe.size[1],
            pipe_u_x = this.startX,
            pipe_d_y = pipe_u_y + this.entranceWidth,
            [X, Y] = birdPosition;
        // console.log((Y < pipe_d_y && X < pipe_u_x + this.upPipe.size[0] && X > pipe_u_x))
        // console.log(Y, pipe_d_y)
        // 上管子碰撞检测
        if ((Y < pipe_u_y && (X + this.birdSize[0]) > pipe_u_x && X + this.birdSize[0] < pipe_u_x + this.upPipe.size[0]) ||
            (Y < pipe_u_y && X < pipe_u_x + this.upPipe.size[0] && X > pipe_u_x)
        ) {
            return 0;
            // 下管子碰撞检测
        } else if ((Y + this.birdSize[1] > pipe_d_y && X + this.birdSize[0] > pipe_u_x && X + this.birdSize[0] < pipe_u_x + this.downPipe.size[0]) ||
            (Y + this.birdSize[1] > pipe_d_y && X > pipe_u_x && X < pipe_u_x + this.downPipe.size[0])) {
            return 0;
        } else if (X > pipe_u_x + this.upPipe.size[0] && !this.isPassed) {
            this.isPassed = true;
            return 1;
        }
    }

    stop() {
        this.pipeSpeed = 0;
    }
}