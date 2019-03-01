// 数据结构  链表
module.exports = class LinkedList {

    constructor() {
        this.length = 0;
        this.head = null;
    }

    // 向列表尾部添加一个新的项
    append(element) {
        const node = {
            value: element,
            next: null
        }
        if (this.isEmpty()) {
            this.head = node;
        } else {
            let _last = this.head;
            // 找到最后一项
            while(_last.next) {
                _last = _last.next;
            }
            _last.next = node;
        }
        this.length ++;
    }

    // 向列表的特定位置插入一个新的项
    insert(position, element) {
        if (position < 0 || position > this.length) throw new Error('beyond index');
        let node = {
            value: element,
            next: null
        };
        this.length ++;
        if (position === 0) {
            node.next = this.head;
            this.head = node;
            return;
        }
        let _index = 0,
            prev = this.head;
        while(position - 1 !== _index) {
            prev = prev.next;
            _index ++;
        }
        node.next = prev.next;
        prev.next = node;
    }

    // 从列表中移除一项
    remove(element) {
        // 是否移除的是第一项
        if (this.head.value === element) {
            this.head = this.head.next;
        } else {
            let prev = this.head;
            let cur = this.head.next;
            while(cur) {
                if (cur.value === element) {
                    prev.next = cur.next || null;
                    break;
                }
                prev = cur;
                cur = cur.next;
            }
        }
        this.length --;
    }

    indexOf(element) {
        let cur = this.head,
            _index = -1;
        while(cur) {
            _index += 1;
            if (cur.value === element) {
                return _index;
            }
            cur = cur.next;
        }
        return -1;
    }

    removeAt(position) {
        // 没有对position 做判断
        this.length --;
        if (position === 0) {
            this.head = this.head.next || null;
            return;
        }
        let cur = this.head;
        let _index = 0;
        while(cur) {
            if (_index === position - 1) {
                cur.next = cur.next.next ? cur.next.next : null;
                break;
            }
            cur = cur.next;
            _index ++;
        }
    }

    size() {
        return this.length;
    }

    isEmpty() {
        return this.length === 0;
    }

    toString() {
        let cur = this.head;
        let str = '';
        while(cur) {
            str += cur.value;
            cur = cur.next;
        }
        return str;
    }

}

// test
// let link = new LinkedList();

// // console.log(link.isEmpty())
// // console.log(link.size())

// link.append('liwei')
// link.append(22)
// link.append('codeer')

// console.log(link.toString())
// console.log(link.size())

// // link.remove('codeer')
// // link.removeAt(2)
// // console.log(link.indexOf('codeer'))
// // link.insert(2, 'haha')
// console.log(link.indexOf('liwei'))
// console.log(link.toString())
// console.log(link.size())