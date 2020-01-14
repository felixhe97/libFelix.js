'use strict';

/**
 * Merge sort implementation
 * @param {Array<*>} arrayToSort - will be modified/sorted
 * @param {function} [comparator] - default by ascending number
 * @returns {Array<*>} - the sorted array, for chaining calls
 */
module.exports = (function(){
    // TODO merge could be improved to use less temp memory
    function merge(begin, mid, end, comparator) {
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
     * @param {number} begin - inclusive array index
     * @param {number} end - inclusive array index
     */
    function split(begin, end, comparator){
        if (begin < end) {
            let mid = (Math.trunc((end - begin) / 2)) + begin;
            split(begin, mid, comparator);
            split(mid + 1, end, comparator);
            merge(begin, mid, end, comparator);
        }
    }

    return function(arrayToSort, comparator = (a,b) => a-b) {
        if (arrayToSort && Array.isArray(arrayToSort) && comparator &&
            typeof comparator === "function")
        {
            split(0, arr.length - 1);
        }
        return arrayToSort;
    }
})();