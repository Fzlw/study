// 数据结构 栈
class Stack {
    constructor() {
        this.stack = [];
    }

    push(ele) {
        this.stack.push(ele);
    }

    pop() {
        this.stack.pop();
    }

    peek() {
        return this.stack[this.stack.length - 1];
    }

    isEmpty() {
        return this.stack.length === 0;
    }

    clear() {
        this.stack = [];
    }

    size() {
        return this.stack.length;
    }

    print() {
        console.log(this.stack.toString())
    }
}


// 测试
let stack = new Stack();
console.log(stack.isEmpty())

stack.push(4)
stack.push(10)

console.log(stack.size())
console.log(stack.isEmpty())

stack.pop()

stack.push(22)
stack.print()

