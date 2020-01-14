'use strict';

/**
 * @param {Array<*>} arr
 * @param {number} i
 * @param {number} j
 * @returns {boolean} true if swapped arr[i] and arr[j], else returns false
 */
module.exports = function(arr, i, j) {
    if (arr && Array.isArray(arr) && Number.isInteger(i) &&
        Number.isInteger(j) && i <= j && i >= 0 && j < arr.length) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        return true;
    } else {
        return false;
    }
}
