/**
 * Private class for Deque members
 */
class ListNode {
    constructor(item) {
        this.item = item;
        this.next = null;
        this.prev = null;
    }
}

/**
 * Doubly linked-list deque implementation
 */
class Deque {
    /**
     * Double-ended queue constructor
     * @param {Iterable<*>} [iterable] - iterable object to turn into deque
     */
    constructor(iterable) {
        this.length = 0;
        this.head = null;
        this.tail = null;
        if (iterable && iterable[Symbol.iterator]) {
            for (let item of iterable) {
                this.pushBack(item);          
            }
        }
    }

    // protocol for spread operators and for-of loops
    *[Symbol.iterator] () {
        let node = this.head;
        while (node) {
            yield node.item;
            node = node.next;
        }
    }

    /**
     * Add item to back of deque
     * @param {*} item
     */
    pushBack(item){
        if (this.length) {
            let temp = new ListNode(item);
            temp.prev = this.tail;
            this.tail.next = temp;
            this.tail = temp;
        } else {
            this.head = new ListNode(item);
            this.tail = this.head;
        }
        return ++this.length;
    }

    /**
     * Add item to front of deque
     * @param {*} item 
     */
    pushFront(item){
        if (this.length) {
            let temp = new ListNode(item);
            this.head.prev = temp;
            temp.next = this.head;
            this.head = temp;
        } else {
            this.head = new ListNode(item);
            this.tail = this.head;
        }
        return ++this.length;
    }

    /**
     * Remove item from back of deque, and return it
     * @returns {*} last item
     */
    popBack(){
        if (this.length) {
            let temp = this.tail;
            if (this.length > 1) {
                this.tail = this.tail.prev;
                this.tail.next = null;
            } else {
                this.head = null;
                this.tail = null;
            }
            --this.length;
            return temp.item;
        } else {
            return null;
        }
    }

    /**
     * Removes item from front of deque, and returns it
     * @returns {*} first item
     */
    popFront(){
        if (this.length) {
            let temp = this.head;
            if (this.length > 1) {
                this.head = this.head.next;
                this.head.prev = null;
            } else {
                this.head = null;
                this.prev = null;
            }
            --this.length;
            return temp.item;
        } else {
            return null;
        }
    }

    /**
     * @returns {*} item from front
     */
    front(){
        if (this.length) {
            return this.head.item;
        } else {
            return null;
        }
    }

    /**
     * @returns {*} item from back
     */
    back(){
        if (this.length) {
            return this.tail.item;
        } else {
            return null;
        }
    }

    /**
     * Removes first matching item from deque,
     * returns new length, or -1 if not found
     * @param {*} item to remove from deque
     * @returns {Number} new length, or -1 
     */
    remove(item) {
        if (this.length) {
            let temp = this.head;
            while (temp) {
                if (temp.item === item) {
                    if (temp.prev) {
                        temp.prev.next = temp.next;
                    }
                    if (temp.next) {
                        temp.next.prev = temp.prev;
                    }
                    if (temp === this.head) {
                        this.head = temp.next;
                    }
                    if (temp === this.tail) {
                        this.tail = temp.prev;
                    }
                    temp.prev = null;
                    temp.next = null;
                    return --this.length;
                } else {
                    temp = temp.next;
                }
            }
        }
        return -1;
    }

    /**
     * Returns item at given 0-based index of deque
     * @param {Number} index - 0-based index of deque to access
     * @returns {*} - item at index of deque, or null
     */
    at(index) {
        if (typeof index == "number" && index < this.length) {
            let node = this.head;
            while (index--) {
                node = node.next;
            }
            return node.item;
        } else {
            return null;
        }
    }

    /**
     * Returns 0-based index of item in deque, or -1 if not found
     * @param {*} item thing to search for in deque
     * @returns {Number} 0-based index in deque, or -1 
     */
    has(item) {
        if (node.length) {
            let index = 0;
            let temp = this.head;
            while (temp) {
                if (temp.item === item) {
                    return index;
                } else {
                    temp = temp.next;
                    ++index;
                }
            }
        } 
        return -1;
    }
}

module.exports = Deque;