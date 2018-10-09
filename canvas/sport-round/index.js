class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 30;
    this.dx = parseInt(Math.random() * 18) - 9;
    this.dy = parseInt(Math.random() * 18) - 9;
    this.color = `rgba(${this.rgb()}, ${this.rgb()}, ${this.rgb()}, 0.5)`;

    all.push(this);
  }

  render() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  move() {
    console.log(this.dx, this.dy)
    this.x += this.dx;
    this.y += this.dy;
    this.r -= 0.5;
  }

  remove(entity) {
    all.forEach((item, index) => {
      if (item === entity) {
        all.splice(index, 1);
      }
    })
  }

  rgb() {
    return parseInt(Math.random() * 256);
  }
}

let canvas = $(".canvas")[0];
let ctx = canvas.getContext("2d");
let all = [];
canvas.width = $(document).width();
canvas.height = $(document).height();

$(".canvas").on('mousemove', (e) => {
  let x = e.clientX,
    y = e.clientY;
  new Ball(x, y);
})

setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  all.forEach(item => {
    if (item.r > 0) {
      item.move();
      item.render();
    } else {
        item.remove(item);
    }
  })
}, 60 / 1000)

