'use strict'

const getRandIndex = require('../utils/getRand').getRandomIntInclusive;
const swap = require('../utils/swapElements');

/**
 * In-place recursive quicksort on the indices
 *
 * @param {Array<*>} arrayToSort
 * @param {function} [comparator] - default ascending numbers
 * @return {Array<*>} - returns the sorted array for chaining function calls
 */
module.exports = (function(){
    /**
     * Quicksort partition array
     *
     * @param {Array<*>} arr
     * @param {number} begin - index of array
     * @param {number} end - index of array
     * @param {function} comparator
     */
    function partition(arr, begin, end, comparator){
        if (begin < end) {
            let pivotIndex = getRandIndex(begin, end);
            let pivot = arr[pivotIndex];
            swap(arr, pivotIndex, end);
            let i = begin;
            let j = end - 1;
            while (i <= j) {
                if (comparator(arr[i], pivot) <= 0) {
                    ++i;
                } else {
                    swap(arr, i, j);
                    --j;
                }
            }
            swap(arr, i, end);
            partition(arr, begin, i - 1, comparator);
            partition(arr, i + 1, end), comparator;
        }
    }

    return function(arr, comparator = (a, b) => a-b) {
        if (arr && Array.isArray(arr) && comparator &&
            typeof comparator === "function")
        {
            partition(arr, 0, arr.length - 1, comparator);
        }
        return arr;
    }
})();
