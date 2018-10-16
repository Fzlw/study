class Bird {
    constructor(ctx, R, data, ) {
        this.ctx = ctx;
        this.data = data;
        this.img = R["allImg"];
        this.birdPosition = [231, 659]; // 小鸟在切片中的位置
        this.birdSize = [34, 24]; // 小鸟的切片大小
        this.init();
    }
    init() {
        this.dX = (this.data.WIDTH * (1 - this.data.SLICE)) / 2;
        this.dY = (this.data.HEIGHT * this.data.SLICE) / 2;
        this.count = 0; // 帧数
        this.angle = 0.1; // 下落每帧旋转角度
        this.flyPow = 20; // 飞行能量
    }
    create() {
        const sX = this.birdPosition[0],
            sY = this.birdPosition[1],
            W = this.birdSize[0],
            H = this.birdSize[1];
        // 绘制小鸟
        this.ctx.drawImage(this.img, sX, sY, W, H, this.dX, this.dY, W, H);
    }
    update(labdY) {
        this.dY += this.count * this.data.G;
        if (this.dY > labdY - this.birdSize[1]) { // 不能进入大地
            this.dY = labdY - this.birdSize[1];
        } else if (this.dY <= 0) { // 不能超过天空
            this.dY = 0;
            this.count = 0;
        }
        this.create();
        this.changeAction();

        this.count++;
        this.fly <= 0 ? this.fly = 0 : this.fly--;
        this.angle += 0.1;
        console.log(this.count)
    }
    // 返回鸟的大小以及坐标
    getBirdInfo() {

    }
    // 
    fly() {
        this.fly += 20
        this.count -= this.fly;
    }
    changeAction() {
        if (this.fly > 0) {
            // 飞的条件
        } else {
            this.ctx.save();
            this.ctx.translate(this.dX + this.birdSize[0] / 2, this.dY + this.birdSize[1] / 2);
            this.ctx.rotate(this.angle);
            this.ctx.restore();
        }
    }
}