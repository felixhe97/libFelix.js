'use strict';

const getRandIndex = require('../utils/getRand').getRandomIntInclusive;
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
module.exports = (function() {
    /**
     * Main quickselect logic
     *
     * @param {Array} arr - array to search
     * @param {number} k - kth item to return
     * @param {function} comparator
     */
    function iterativeQuickSelect(arr, k, comparator) {
        let begin = 0;
        let end = arr.length - 1;
        while (begin < end) {
            let pivotIndex = getRandIndex(begin, end);
            swap(arr, pivotIndex, end);
            let i = begin;
            let j = end - 1;
            while (i <= j) {
                if (comparator(arr[i], arr[pivotIndex]) <= 0) {
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
        if (arrayToSearch && Array.isArray(arrayToSearch) &&
            Number.isInteger(k) && k >= 1 && comparator &&
            typeof comparator === "function")
        {
            --k;
            ans = iterativeQuickSelect(arrayToSearch, k, comparator);
        }
        return ans;
    }
})();