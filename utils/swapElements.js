'use strict';

/**
 * Swaps elements at i and j in given array.
 *
 * @param {Array<*>} arr
 * @param {number} i within array 0-based bounds
 * @param {number} j within array 0-based bounds
 * @returns {boolean} true if swapped arr[i] and arr[j], false otherwise
 */
module.exports = function(arr, i, j) {
    if (arr && Array.isArray(arr) && Number.isInteger(i) &&
        Number.isInteger(j) && i >= 0 && j >= 0 && 
        i < arr.length && j < arr.length) 
    {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        return true;
    } else {
        return false;
    }
}