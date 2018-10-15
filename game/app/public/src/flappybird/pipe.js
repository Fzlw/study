

class Pipe {
    constructor(ctx, R, data) {
        this.ctx = ctx;
        this.img = R["allImg"];
        this.pipeSpeed = data.landSpeed;
        this.entranceWidth = data.entranceWidth;
        this.upPipe = { position: [112, 646], size: [52, 320] };
        this.downPipe = { position: [169, 646], size: [52, 320] };
    }
    
    create() {
        const sx_u = this.upPipe.position[0],
              sy_u = this.upPipe.position[1],
              sW = this.upPipe.size[0],
              sH = this.upPipe.size[1],
              sx_d = this.downPipe.position[0],
              sy_d = this.downPipe.position[1];
        const baseH = -(sH - 100),
              posY_u =  baseH + parseInt(Math.random() * 150),
              posY_d = sH - Math.abs(posY_u) + this.entranceWidth,
              startX = 288;
        console.log(sH - Math.abs(posY_u), posY_u)
        // 上管子
        this.ctx.drawImage(this.img, sx_u, sy_u, sW, sH, 100, posY_u, sW, sH);
        // 下管子
        
        this.ctx.drawImage(this.img, sx_d, sy_d, sW, sH, 100, posY_d, sW, sH);
    }
}