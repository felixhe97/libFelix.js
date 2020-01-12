'use strict'

/**
 * Swap arr[i] and arr[j]
 * @param {Array<any>} arr 
 * @param {Number} i 
 * @param {Number} j 
 */
function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

/**
 * Helper function for BinaryHeap.push()
 * @param {Array<any>} [arr] 
 * @param {Function} [comparator] 
 */
function propagateUp(arr, comparator) {
    let index = arr.length - 1;
    let parentIndex = Math.trunc((index - 1) / 2);
    while (parentIndex >= 0 && comparator(arr[parentIndex], arr[index]) > 0) {
        swap(arr, parentIndex, index);   
        index = parentIndex;
        parentIndex = Math.trunc((index - 1) / 2);     
    } 
}

/**
 * Helper function for BinaryHeap.pop()
 * @param {Array<any>} arr 
 * @param {Function} comparator 
 */
function propagateDown(arr, comparator) {
    let n = 0;
    let indexFirstChild = 2*n + 1;
    let indexSecondChild = 2*n + 2;
    while (indexFirstChild < arr.length) {
        if (indexSecondChild >= arr.length || comparator(arr[indexFirstChild], arr[indexSecondChild]) <= 0) {
            if (comparator(arr[indexFirstChild], arr[n]) <= 0) {
                swap(arr, n, indexFirstChild);
                n = indexFirstChild;
            } else {
                break;
            }
        } else {
            if (comparator(arr[indexSecondChild], arr[n]) <= 0) {
                swap(arr, n, indexSecondChild);
                n = indexSecondChild;
            } else {
                break;
            }
        }
        indexFirstChild = 2*n + 1;
        indexSecondChild = 2*n + 2;
    }
}

/**
 * Binary heap, array-based implementation, default min heap
 */
class BinaryHeap {
    constructor(iterable, defaultComparator = (a,b)=>a-b) {
        this.comparator = defaultComparator;
        this.array = [];
        if (iterable && iterable[Symbol.iterator]) {
            for (let x of iterable) {
                this.push(x);
            }
        }
    }

    // generator function, follows iterable protocol
    *[Symbol.iterator] () {
        let index = 0;
        while (index < this.array.length) {
            yield this.array[index++];
        }
    }

    /**
     * @returns number of items in heap
     */
    get length() {
        return this.array.length;
    }

    /**
     * @returns reference to top of heap, else return undefined
     */
    top() {
        if (this.array.length) {
            return this.array[0];
        } else {
            return undefined;
        }
    }

    /**
     * Insert an item into heap
     * @param {*} item 
     */
    push(item) {
        this.array.push(item);
        propagateUp(this.array, this.comparator);
    }

    /**
     * @returns item from top of heap, else return undefined
     */
    pop() {
        if (this.array.length) {
            swap(this.array, 0, this.array.length-1);
            let first = this.array.pop();
            propagateDown(this.array, this.comparator);
            return first;
        } else {
            return undefined;
        }
    }
}

module.exports = BinaryHeap;
