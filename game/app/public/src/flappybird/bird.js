class Bird {
    constructor(ctx, R, data) {
        this.ctx = ctx;
        this.data = data;
        this.img = R["allImg"];
        this.birdPosition = [231, 659]; // 小鸟在切片中的位置
        this.birdSize = [34, 24]; // 小鸟的切片大小
        this.init();
    }
    init() {
        // 小鸟拍打翅膀度动作
        this.action = {
            a_0: [231, 659],
            a_1: [230, 710],
            a_2: [174, 982]
        };
        this.boom = {
            b_0: [320, 734, 118, 91],
            b_1: [456, 734, 117, 113],
            b_2: [385, 548, 103, 97]
        }
        this.index = 0; // 小鸟拍打翅膀的索引
        this.dX = (this.data.WIDTH * (1 - this.data.SLICE)) / 2; // 小鸟的X坐标
        this.dY = (this.data.HEIGHT * this.data.SLICE) / 2; // 小鸟的Y坐标
        this.count = 0; // 帧数
        this.angle = 0.1; // 下落每帧旋转角度
        this.flyPow = 0; // 飞行能量
        this.flyAngle = 0; // 小鸟飞时抬升角度
        this.labdY = 502 - 107 + (this.data.HEIGHT - 502) * this.data.SLICE; // 大地Y坐标
        this.isEnd = false;
    }
    create() {
        const sX = this.action["a_" + this.index][0],
            sY = this.action["a_" + this.index][1],
            W = this.birdSize[0],
            H = this.birdSize[1];
        this.ctx.save();
        this.ctx.translate(this.dX + W / 2, this.dY + H / 2);
        if (this.flyPow > 0) {
            // 判断小鸟是否在飞，有飞行能量就表示在飞
            this.ctx.rotate(-this.flyAngle);
        } else {
            this.ctx.rotate(this.angle);
        }
        this.ctx.drawImage(this.img, sX, sY, W, H, -(W / 2), -(H / 2), W, H);
        // this.ctx.fillStyle = "red"
        // this.ctx.fillRect(-(W / 2), -(H / 2), W, H);
        this.ctx.restore();
    }

    /**
     * @param {number} fNo 总帧号
     * @returns {arr} 返回小鸟左上角XY坐标
     */
    update(fNo) {
        this.dY += this.count * this.data.G;
        if (this.dY > this.labdY - this.birdSize[1]) { // 不能进入大地
            this.dY = this.labdY - this.birdSize[1];
            this.isEnd = true;
        } else if (this.dY <= 0) { // 不能超过天空
            this.dY = 0;
            this.count = 0;
        }
        this.create();
        // 每100帧小鸟拍打一次翅膀
        if (fNo % 10 === 0 && !this.isEnd) {
            this.index >= 2 ? this.index = 0 : this.index++;
        }

        this.count++;
        this.flyPow <= 0 ? this.flyPow = 0 : this.flyPow--;
        if (this.isEnd) {
            this.angle = this.angle;
        } else {
            this.angle <= Math.PI / 2 ? this.angle += Math.PI / 180 : this.angle = 0;
        }
        this.flyAngle <= 0 ? this.flyAngle = 0 : this.flyAngle -= Math.PI / 180;
        // console.log(this.dX ,this.dY)
        return this.isEnd ? [0, 0] : [this.dX, this.dY];
    }
    // 返回鸟的大小以及坐标
    getBirdInfo() {

    }
    // 
    fly() {
        this.flyPow = 20; // 每次飞给20的能量
        this.angle = -this.flyAngle; // 每次飞重置下落角度，从当前上飞角度开始下落
        this.flyAngle = Math.PI / 6; // 每次抬升30度
        this.count -= this.flyPow;
    }

    endBoom(fNo, XY) {
        if (fNo % 10 === 0) {
            this.index >= 2 ? this.index = 0 : this.index++;
        }
        let boom = this.boom['b_' + this.index];
        this.ctx.save()
        this.ctx.translate((XY[0] + boom[2]) / 2, (XY[1] + boom[3]) / 2);
        this.ctx.drawImage(this.img, boom[0], boom[1], boom[2], boom[3], -XY[0] / 2, -XY[1] / 2, boom[2], boom[3]);
        this.ctx.restore()
    }
}