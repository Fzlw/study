// 数据结构 队列
class Queue {

    constructor() {
        this.queue = [];
    }

    enqueue(ele, level = 0) {
        this.queue.push({
            value: ele,
            level
        });
    }

    dequeue() {
        return this.queue.shift().value;
    }

    front() {
        return this.queue[0].value
    }

    isEmpty() {
        return this.queue.length === 0
    }

    size() {
        return this.queue.length
    }

    print() {
        let values = this.queue.map(ele => ele.value);
        console.log(values.toString())
    }

}

// 测试
// let queue = new Queue();
// console.log(queue.isEmpty())

// queue.enqueue(12)
// queue.enqueue('liwei')

// queue.print()

// console.log(queue.front())

// queue.dequeue()
// queue.enqueue('haha')

// console.log(queue.size())
// console.log(queue.isEmpty())


// 数据结构  优先队列
class PriorityQueue extends Queue {

    constructor() {
        super()
    }

    // 重载添加元素方法
    enqueue(element, level = 0) {
        let isAdd = false;
        for (let i = 0; i < this.queue.length; i ++) {
            let cur = this.queue[i];
            if (cur.level < level) {
                this.queue.splice(i, 0, {
                    value: element,
                    level
                })
                isAdd = true;
                break;
            }
        }
        if (!isAdd) {
            this.queue.push({
                value: element,
                level
            })
        }
    }

}

// 测试
// let priority = new PriorityQueue();
// priority.enqueue('lll')
// priority.enqueue('wer')
// priority.enqueue('09876')
// priority.print()

// priority.enqueue('liwei', 1)
// priority.enqueue('haha', 1)
// priority.enqueue('yyyyy', 3)
// priority.enqueue('dfghjkl', 2)
// priority.enqueue('rtyuio', 1)

// priority.print()
// console.log(priority.size())

module.exports = Queue;