class Count {

  constructor(options) {
    let {
      target
    } = options;
    this.canvas = target;

    this.init();
  }

  init() {
    this.cW = 300;
    this.cH = 300;
    // 线宽
    this.lineW = 10;
    // 字体大小
    this.fontSize = 35;
    // 圆起始角度
    this.startAngle = -0.5 * Math.PI;
    // 每一秒对应的角度
    this.unit = 2 * Math.PI / (24 * 60 * 60);
    // 同css高缩小比例
    this.rate = this.cH / $(this.canvas).height();
    // 字体实际大小的一半高
    this.centerH = (this.fontSize / this.rate) / 2;

    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = this.cW;
    this.canvas.height = this.cH;
    this.setTime()
  }

  // 设置倒计时剩余时间
  setTime() {
    let time = 'Wed Oct 31 2018 01:30:00 GMT+0800 (CST)';
    let date = new Date(time),
        year = date.getFullYear(),
        month = date.getMonth(),
        day = date.getDate();
    let next = Date.parse(new Date(year, month, day + 1, 0, 0, 0));
    // this.count = (next - date.getTime()) / 1000;
    this.count = 20 * 60 * 60;
  }

  render() {
    let r = this.cW / 2,
      cR = r - 4 * this.lineW,
      endAgnle = this.startAngle + this.unit * this.count;

    this.ctx.clearRect(0, 0, this.cW, this.cH);
    // 绘制阴影
    this.ctx.globalCompositeOperation = "lighter";
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 19;
    this.ctx.shadowBlur = 45;
    this.ctx.shadowColor = "#072B51"; // #072B51

    // 描外边
    this.ctx.beginPath();
    this.ctx.lineWidth = this.lineW;
    this.ctx.lineCap = "round";
    this.ctx.strokeStyle = "#fff";
    this.ctx.arc(r, r, cR, this.startAngle, endAgnle);
    this.ctx.stroke();
    this.ctx.closePath();


    // 描内圆
    this.ctx.beginPath();
    this.ctx.fillStyle = "#fff";
    this.ctx.arc(r, r, cR - 2 * this.lineW, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();

    // 设置重合部分为透明
    this.ctx.globalCompositeOperation = "xor";

    // 描文字
    let text = this.getFillText();
    this.ctx.shadowColor = "transparent";
    this.ctx.textAlign = "center";
    this.ctx.font = this.fontSize + 'px Roboto-Medium';
    this.ctx.fillText(text, r, r + this.centerH);
  }

  // 定时调用
  timing() {
    let start = 0;
    let timeout = () => {
      setTimeout(() => {
        this.render();
        start = 1;
        timeout();
      }, start);
    }
    timeout();
  }

  // 获取描绘内容
  getFillText() {
    let h = Math.floor(this.count / 3600),
      m = Math.floor((this.count - h * 3600) / 60),
      s = this.count - h * 3600 - m * 60;
    if (this.count <= 0) {
      this.count = 24 * 3600;
    }

    h = this.fill(h);
    m = this.fill(m);
    s = this.fill(s);
    this.count -= 1;
    return h + ":" + m + ":" + s;
  }

  // 固定两位显示，不足前面补 0 
  fill(str, bit = 2) {
    let tar = typeof str === "string" ? str : str.toString();
    if (tar.length >= bit) return tar;
    let res = "";
    while (bit > 0) {
      res = "0" + tar;
      bit -= 1;
    }
    return res;
  }

}

let c = new Count({
  target: $('.can')[0]
});
c.timing();