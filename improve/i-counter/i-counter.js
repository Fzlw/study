class Counter {
    count() {
        let time = 5;
        let i = 0;
        let timmer = function() {
            setTimeout(function() {
                console.log(time);
                i = 1;
                time -= 1;
                if (time >= 0) {
                    timmer();
                } else {
                    console.log('end')
                }
            },1000 * i);
        }
        timmer();
    }
}
let c = new Counter();
c.count();