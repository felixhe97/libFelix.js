'use strict';

const getRandIndex = require('../utils/getRandomNum').getRandomIntInclusive;
const swap = require('../utils/swapElements');

/**
 * Find k-th value in array, based on comparator.
 *
 * @param {Array<*>} arr- input array
 * @param {number} k - 1-based thing to find
 * @param {function} [compareFunction] - optional, default is find k-th
 * smallest in array of numbers
 * @returns k-th value in array, or NaN
 */
module.exports = (function(){
    /**
     * Main quickselect logic, acting on static arr variable
     *
     * @param {Array} arr - array to search
     * @param {number} k - kth item to return
     * @param {function} comparator
     */
    function iterativeQuickSelect(arr, k, comparator){
        let begin = 0;
        let end = arr.length - 1;
        --k;
        while(begin < end) {
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
            if (i === k) {
                break;
            } else if (i > k) {
                end = i - 1;
            } else {
                begin = i + 1;
            }
        }
        return arr[k];
    }

    return function(arrayToSearch, k, comparator = (a, b) => a-b) {
        let ans = NaN;
        if (arrayToSearch && Array.isArray(arrayToSearch) && k &&
            Number.isInteger(k) && comparator &&
            typeof comparator === "function")
        {
            ans = iterativeQuickSelect(arrayToSearch, k, comparator);
        }
        return ans;
    }
})();