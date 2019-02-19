// 数据结构  双向链表
const LinkedList = require('./linkedlist');

class DoublyLinkedList extends LinkedList {

    constructor() {
        super();
    }

    append(element) {
        let node = {
            prev: null,
            value: element,
            next: null
        };
        if (this.isEmpty()) {
            this.head = node;
        } else {
            let _last = this.head;
            while(_last.next) {
                // TODO
            }
        }
    }

}