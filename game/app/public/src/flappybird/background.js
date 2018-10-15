class BackGround {
    constructor(ctx, R, data) {
        this.ctx = ctx;
        this.R = R;
        this.DATA = data;
        this.init();
    }
    init() {
        this.bS = 0;
        this.lS = 0;
        this.backImg()
    }

    backImg() {
        let bW = 288,
            bH = 502,
            lW = 336,
            lH = 107,
            posiY = (this.DATA.HEIGHT - bH) * this.DATA.SLICE,
            img = this.R["allImg"];
        // 图片的分割线和屏幕分割线一致   渲染个数优化 TODO   拉回去有点错位修复 TODO
        this.ctx.drawImage(img, 0, 0, bW, bH, 0 + this.bS, posiY, bW, bH);
        this.ctx.drawImage(img, 0, 0, bW, bH, bW + this.bS, posiY, bW, bH);
        this.ctx.drawImage(img, 0, 0, bW, bH, bW * 2 + this.bS, posiY, bW, bH);
        // 天空猫腻
        this.ctx.fillStyle = "#4ec0ca";
        this.ctx.fillRect(0, 0, this.DATA.WIDTH, posiY + 1);
        // 大地   渲染个数优化 TODO
        this.ctx.drawImage(img, 584, 0, lW, lH, 0 + this.lS, bH - lH + posiY, lW, lH);
        this.ctx.drawImage(img, 584, 0, lW, lH, lW + this.lS, bH - lH + posiY, lW, lH);
        this.ctx.drawImage(img, 584, 0, lW, lH, lW * 2 + this.lS, bH - lH + posiY, lW, lH);
        // 大地猫腻
        this.ctx.fillStyle = "#ded895";
        this.ctx.fillRect(0, posiY + bH, this.DATA.WIDTH, this.DATA.HEIGHT - posiY - bH)
    }

    update() {
        // 速度
        this.bS = this.bS - this.DATA.bcakSpeed;
        this.lS = this.lS - this.DATA.landSpeed;
        this.lS = Math.abs(this.lS) >= 288 ? 0 : this.lS;
        this.bS = Math.abs(this.bS) >= 336 ? 0 : this.bS;
        
        this.backImg();
    }
}