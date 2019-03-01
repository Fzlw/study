class Counter {
    count() {
        let time = 5;
        let i = 0;
        let that = this;
        let timmer = function() {
            setTimeout(function() {
                console.log(time);
                i = 1;
                time -= 1;
                if (time >= 0) {
                    timmer();
                } else {
                    console.log('end');
                    that.a();
                }
            },1000 * i);
        }
        timmer();
    }

    a() {
        console.log('这是a函数')
    }
}
let c = new Counter();
c.count();