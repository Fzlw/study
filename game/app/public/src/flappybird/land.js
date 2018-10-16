class Land {
  constructor(ctx, R, data) {
    this.ctx = ctx;
    this.R = R;
    this.DATA = data;
    this.lS = 0;
  }

  render() {
    let bH = 502,
      lW = 336,
      lH = 107,
      posiY = (this.DATA.HEIGHT - bH) * this.DATA.SLICE,
      img = this.R["allImg"];
    // 大地   渲染个数优化 TODO
    this.ctx.drawImage(img, 584, 0, lW, lH, 0 + this.lS, bH - lH + posiY, lW, lH);
    this.ctx.drawImage(img, 584, 0, lW, lH, lW + this.lS, bH - lH + posiY, lW, lH);
    this.ctx.drawImage(img, 584, 0, lW, lH, lW * 2 + this.lS, bH - lH + posiY, lW, lH);
    // 大地猫腻
    this.ctx.fillStyle = "#ded895";
    this.ctx.fillRect(0, posiY + bH, this.DATA.WIDTH, this.DATA.HEIGHT - posiY - bH)
    return bH - lH + posiY;
  }

  update() {
    this.lS = this.lS - this.DATA.landSpeed;
    this.lS = Math.abs(this.lS) >= 336 ? 0 : this.lS; // 大地速度限制

    return this.render();
  }
}