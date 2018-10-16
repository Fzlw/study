class Bird {
    constructor(ctx, R, data,) {
        this.ctx = ctx;
        this.data = data;
        this.img = R["allImg"];
        this.birdPosition = [231, 659];  // 小鸟在切片中的位置
        this.birdSize = [34, 24];  // 小鸟的切片大小
        this.init();
    }
    init() {
        this.dX = (this.data.WIDTH * (1 - this.data.SLICE)) / 2;
        this.dY = (this.data.HEIGHT * this.data.SLICE) / 2;
        this.all = 20;   // 初始能量
        this.count = 0;  // 帧数
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
        if (this.dY > labdY - this.birdSize[1]) {
            this.dY = labdY - this.birdSize[1];
        }
        this.create();
        this.count ++;
    }
    getPosition() {
        
    }
    fly() {
        this.count -= 30;
    }
}