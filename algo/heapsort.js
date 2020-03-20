'use strict';

const swap = require('../utils/swapElements');

/**
 * In place TODO"non-stable" heap sort implementation
 *
 * @param {Array<*>} arr - array to modify/sort
 * @param {function} [comparator] - default sort by ascending number
 * @returns {Array<*>} - for method chaining
 */
module.exports = (function() {
    /**
     * Helper function for arrayToHeap()
     *
     * @param {Array<*>} arr
     * @param {number} index
     * @param {function} comparator
     */
    function propagateUp(arr, index, comparator) {
        let parentIndex = Math.trunc((index - 1) / 2);
        while (parentIndex >= 0 &&
            comparator(arr[parentIndex], arr[index]) > 0)
        {
            swap(arr, parentIndex, index);
            index = parentIndex;
            parentIndex = Math.trunc((index - 1) / 2);
        }
    }

    /**
     * Helper function for heapToArray()
     *
     * @param {Array<*>} arr
     * @param {number} index
     * @param {function} comparator
     */
    function propagateDown(arr, index, comparator) {
        let n = 0;
        let indexFirstChild = 2 * n + 1;
        let indexSecondChild = 2 * n + 2;
        while (indexFirstChild < index) {
            if (indexSecondChild >= index ||
                comparator(arr[indexFirstChild], arr[indexSecondChild]) <= 0)
            {
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
     * Heapify the unsorted array in place
     *
     * @param {Array<*>} arr
     * @param {function} comparator
     */
    function arrayToHeap(arr, comparator) {
        for (let x = 0; x < arr.length; ++x) {
            propagateUp(arr, x, comparator);
        }
    }

    /**
     * Shortens heap, while lengthening sorted array, in place
     *
     * @param {Array<*>} arr
     * @param {function} comparator
     */
    function heapToArray(arr, comparator){
        let x = arr.length - 1;
        while (x > 0) {
            swap(arr, 0, x);
            --x;
            propagateDown(arr, x, comparator);
        }
    }

    return function(arr, comparator = (a, b) => a - b) {
        if (arr && Array.isArray(arr) && comparator &&
            typeof comparator === "function")
        {
            arrayToHeap(arr, comparator);
            heapToArray(arr, comparator);
        }
        return arr;
    }
})();