'use strict';

/**
 * Sort an array
 * @param {Array} arrayToSort - will be modified/sorted
 * @param {Function} [compareFunction] - optional comparator
 * @returns {Array} - the sorted array, for chaining calls
 */
const mergeSort = (function(){
    /**
     * Default comparator for mergeSort
     * @param {*} a 
     * @param {*} b 
     */
    function defaultCompare(a, b){
        return a - b;
    }

    // pseudo-static member variables to reduce
    // redundant recursive function arguments
    let arr = null;
    let comparator = defaultCompare;

    // TODO merge could be improved to use less temp memory
    function merge(begin, mid, end) {
        let i = begin;
        let j = mid + 1;
        let temp = [];
        while (i <= mid && j <= end) {
            if (comparator(arr[i], arr[j]) <= 0) {
                temp.push(arr[i]);
                ++i;
            } else {
                temp.push(arr[j]);
                ++j;
            }
        }
        while (i <= mid) {
            temp.push(arr[i]);
            ++i;
        }
        while (j <= end) {
            temp.push(arr[j]);
            ++j;
        }
        for (let x = end; x >= begin; --x) {
            arr[x] = temp.pop();
        }
    }

    /**
     * Recursive top down merge sort splitter
     * @param {Number} begin - inclusive array index
     * @param {Number} end - inclusive array index
     */
    function split(begin, end){
        if (begin < end) {
            let mid = (Math.trunc((end - begin) / 2)) + begin;
            split(begin, mid);
            split(mid + 1, end);
            merge(begin, mid, end);
        }
    }

    return function(arrayToSort, compareFunction) {
        if (arrayToSort && Array.isArray(arrayToSort)) {
            arr = arrayToSort;
            if (compareFunction && typeof compareFunction == "function") {
                comparator = compareFunction;
                split(0, arr.length - 1);
                comparator = defaultCompare;
            } else {
                split(0, arr.length - 1);
            }
            arr = null;
        }
        return arrayToSort;
    }
})();

module.exports = mergeSort;
