class Pipe {
    constructor(ctx, R, data, pipeArr) {
        this.ctx = ctx;
        this.data = data;
        this.pipeArr = pipeArr;  // 存储管子实例的数组
        this.img = R["allImg"];
        this.pipeSpeed = data.landSpeed;   // 管子移动速度，和大地移速一样
        this.entranceWidth = data.entranceWidth;  // 管子的入口宽度
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
        this.startX = this.data.WIDTH + 288; // 管子的起始X坐标
        this.posY_u = baseH + parseInt(Math.random() * 150);
        this.posY_d = sH - Math.abs(this.posY_u) + this.entranceWidth;
        this.create();
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

    update() {
        this.startX = this.startX - this.pipeSpeed;
        // 如果消失就清楚，突变的那一帧会缺失，所以消失一段距离后在删除 * 4
        if (this.startX <= - 4 * this.upPipe.size[0]) {
            this.pipeArr.shift();
            return;
        }
        this.create();
    }
}