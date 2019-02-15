const Queue = require('./queue')
// 队列的应用  循环队列  击鼓传花游戏

let queue = new Queue();
let userList = ['liwei', 'yeqiong', 'liting', 'haha'];

userList.forEach(ele => {
    queue.enqueue(ele);
})

let cur = '';
let count = 6; // 循环轮数
while(queue.size() > 1) {
    for (let i = 0; i < count; i ++) {
        // 构成循环队列
        queue.enqueue(queue.dequeue());
    }
    cur = queue.dequeue();
    console.log(cur + '已经被淘汰')
}
queue.print()
