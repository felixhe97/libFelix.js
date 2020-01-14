'use strict';

const getIndex = require('../utils/getRand').getRandomIntInclusive;
const swap = require('../utils/swapElements');

/**
 * Shuffles elements in array, fisher-yates implementation
 *
 * @param {Array<*>} arr - array of elements to shuffle completely
 * @param {function} [rng] - function returning floating point in range [0, 1)
 */
module.exports = function(arr, rng = Math.random){
    if (arr && Array.isArray(arr)) {
        for (let i = arr.length-1; i >= 0; --i){
            let index = getIndex(0, i, rng);
            swap(arr, i, index);
        }
        return true;
    }
    return false;
}
