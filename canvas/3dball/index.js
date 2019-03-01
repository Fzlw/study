class Ball {
    constructor() {
        // 获取canvas及ctx
        this.W = 400
        this.H = 400
        this.canvas = $('.canvas')[0];
        this.canvas.width = this.W
        this.canvas.height = this.H
        this.ctx = this.canvas.getContext('2d');
        this.init()
    }

    init() {
        const ctx = this.ctx,
                startAngle = Math.PI / 500;
        // ctx全局样式及球体配置
        // ctx.fillStyle = 'red';
        this.ballR = 200;  // 球体半径
        this.fallLen = 1000;   // 球点聚集程度，越大越集中
        this.angleX = startAngle;
        this.angleY = startAngle
        this.isTimmer = null;
        this.initBall()
        this.mousemove()
    }

    testCanvas() {
        
        this.copy = document.createElement('canvas');
        this.copy.width = this.canvas.width;
        this.copy.height = this.canvas.height;
        let copyCtx = this.copy.getContext('2d');
        let len = 1000;
        let diffX = this.canvas.width / 2;
        let diffY = this.canvas.height / 2;

        for (let i = 0; i < len; i ++) {
            let angleA = Math.acos((2 * (i + 1) - 1) / len - 1),  // a
                angleB = angleA * Math.sqrt(len * Math.PI), // b
                z = this.ballR * Math.cos(angleA),
                scale = this.fallLen / ( this.fallLen - z ),
                y = this.ballR * Math.sin(angleA) * Math.sin(angleB),
                x = this.ballR * Math.sin(angleA) * Math.cos(angleB),
                opacity = (z + this.ballR) / (2 * this.ballR),
                zIndex = parseInt(scale * 100),
                color = '#fff';

            copyCtx.save();
            copyCtx.beginPath()
            copyCtx.fillStyle = `rgba(255, 0, 0, ${opacity})`
            copyCtx.arc(x + diffX, y + diffY, 1 * scale, 0, 2 * Math.PI)
            copyCtx.fill()
            copyCtx.restore();
        }

        
    }

    initBall() {
        let ctx = this.ctx;
        // 测试渲染效率  TODO  目前10000个出现明显掉帧
        let data = new Array(10);
        let len = data.length
        data.fill(
            { content: '某某家', size: 30 }
        )
        // 球体坐标x,y坐标偏移量，使其居中
        let diffX = this.W / 2;
        let diffY = this.H / 2;
        
        this.ballList = data.map((ele, i) => {
            let angleA = Math.acos((2 * (i + 1) - 1) / len - 1),  // a
                angleB = angleA * Math.sqrt(len * Math.PI), // b
                
                x = this.ballR * Math.sin(angleA) * Math.cos(angleB),
                y = this.ballR * Math.sin(angleA) * Math.sin(angleB),
                z = this.ballR * Math.cos(angleA),

                scale = this.fallLen / ( this.fallLen - z ),
                opacity = (z + this.ballR) / (2 * this.ballR) + 0.2;
            // console.log(scale, opacity)
            scale < 0 ? 0 : scale;
            // console.log(x, y, z)
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 0, 0, ${opacity})`
            ctx.arc(x + diffX, y + diffY, 10 * scale, 0, 2 * Math.PI);
            ctx.fill()

            return {
                x, y, z
            }
        })

    }

    move() {
        let ctx = this.ctx
        let cosX = Math.cos(this.angleX);
        let sinX = Math.sin(this.angleX);
        let cosY = Math.cos(this.angleY);
        let sinY = Math.sin(this.angleY);
        ctx.clearRect(0, 0, this.W, this.H);
        this.ballList.forEach(ele => {
            let z1 = ele.z * cosX + ele.y * sinX,
                scale = this.fallLen / ( this.fallLen - ele.z ),
                y = ele.y * cosX - ele.z * sinX,
                z = z1 * cosY + ele.x * sinY,
                x = ele.x * cosY - z1 * sinY,
                opacity = (ele.z + this.ballR) / (2 * this.ballR) + 0.2;

            scale = scale < 0 ? 0 : scale;

            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 0, 0, ${opacity})`
            ctx.arc(x + this.W / 2, y + this.H / 2, 10 * scale, 0, 2 * Math.PI);
            ctx.fill()

            ele.x = x;
            ele.y = y;
            ele.z = z;
        })
        // 减缓移动
        this.angleY *= 0.95
        this.angleX *= 0.95
    }

    mousemove() {
        let target = $(this.canvas)
        let throttle = this.throttle;
        let rotate = [ 0, 0 ];
        let that = this;
        target.on('mousemove', throttle(function(e) {
            let { clientX, clientY } = e;
            let rotateX = clientX - rotate[0];
            let rotateY = clientY - rotate[1];

            this.angleY += - rotateX * 0.002;
            this.angleX += - rotateY * 0.002;
            rotate = [ clientX, clientY ];

            // console.log(rotateX, rotateY)
            // console.log(this.angleX, this.angleY)
            
            that.timmer();
        }, 100, this))
    }

    timmer() {
        if (this.isTimmer) return;
        this.isTimmer = setInterval(() => {
            if (Math.abs(this.angleX) < 0.003 && Math.abs(this.angleY) < 0.003) {
                console.log(this.angleX, this.angleY)
                clearInterval(this.isTimmer)
                this.isTimmer = null;
            } else {
                this.move()
            }
        }, 1000/60)
    }

    /**
     * 函数节流
     * 
     */
    throttle(fn, delay, ctx) {
        // 箭头函数因为没有this,因此后续无法通过改变this去绑定它的作用域
        if (!fn || !fn.prototype) return;
        let timmer = null;
        return function(...args) {
            let _ctx = ctx || this;
            if (!timmer) {
                timmer = setTimeout(() => {
                    timmer = null;
                    fn.apply(_ctx, args);
                }, delay)
            }
        }
    }

}

new Ball()