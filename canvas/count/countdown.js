class CountDown {
    constructor(params) {
        this.target = params.target;
        this.time = params.time;
        this.init();
    }
    init() {
        this.start = 0;
        this.end = 0;
    }

    render() {
        let ctx = this.target.getContext('2d');
        let mW = 300,
            mH = 300,
            lineW = 5;
        // ctx.width = mW;
        // ctx.height = mH;
        this.target.width = mW;
        this.target.height = mH;

        let r = mW / 2,
            cR = r - 4 * lineW,
            startAngle = -(1 / 2 * Math.PI),
            endAngle = startAngle + 2 * Math.PI,
            xAngle = 1 * (Math.PI / 180),
            fontSize = 35,
            tmpAngle = startAngle;

        ctx.beginPath();
        ctx.lineWidth = lineW;
        ctx.strokeStyle = '#1c86d1';
        ctx.arc(r, r, cR, 0, this.end);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = 'yellow';
        ctx.arc(r, r, cR - lineW, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath()

        ctx.globalCompositeOperation="xor";

        ctx.fillStyle = 'rgba(255,255,0, 0.5)';
        ctx.textAlign='center';
        ctx.font= fontSize + 'px Microsoft Yahei';
        ctx.fillText('test', r, r)


        // 时间
        let now = new Date();
        console.log(now.getHours())
    }

    change() {
        let rat = 0;
        $(document).on('click', () => {
            this.end = rat * Math.PI;
            this.render();
            rat += 0.1
            console.log(rat)
        })
    }
}

let c = new CountDown({
    target: $('.can')[0]
});
c.change()

