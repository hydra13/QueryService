class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    connect(prev, next) {
        if (prev) {
            prev.next = next;
        }
        if (next) {
            next.prev = prev;
        }
    }
    remove(queryObj) {
        this.connect(queryObj.prev, queryObj.next);
        if (this.length > 0 && queryObj.prev !== null && queryObj.next !== null){
            this.length--;
        }
        queryObj.prev = null;
        queryObj.next = null;
    }
    setLast(queryObj) {
        if (queryObj !== this.tail) {
            this.remove(queryObj);
            this.connect(this.tail, queryObj)
            this.tail = queryObj
            this.length++;
        }
    }
}

module.exports = LinkedList;