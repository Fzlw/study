// 数据结构  链表
class LinkedList {

    constructor() {
        this.link = [];
        this.head = null;
    }

    append(ele) {
        const node = {
            value: ele,
            next: null
        }
        this.link.push(node);

        if (this.isEmpty()) {
            this.head = node;
        } else {
            let last = this.link[this.link.length - 1];
            last.next = node;
        }
    }

    isEmpty() {
        return this.link.length === 0;
    }

    size() {
        return this.link.length;
    }

    toString() {
        return this.link.map(ele => ele.value).toString();
    }

    indexOf(ele) {
        let _index = -1;
        for (let i in this.link) {
            if (this.link[i].value === ele) {
                _index = i;
                break;
            }
        }
        return _index;
    }

    removeAt(index) {
        this.link.splice(index, 1);
        if (index === 0) {
            this.head = this.link[index + 1];
            return;
        } else {
            this.link[index - 1].next = this.link[index + 1] || null;
        }
    }

    remove(ele) {
        let index = this.indexOf(ele);
        if (index !== -1) {
            this.removeAt(index);
        }
    }

    insert(position, ele) {
        let cur = {
            value: ele,
            next: this.link[position + 1] || null
        }
        if (position === 0) {
            this.head = cur;
        } else {
            this.link[position - 1].next = cur;
        }
    }

}