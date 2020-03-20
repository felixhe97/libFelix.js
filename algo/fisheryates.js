'use strict';

const getIndex = require('../utils/getRand').getRandomIntInclusive;
const swap = require('../utils/swapElements');

/**
 * Shuffles array elements in-place, fisher-yates algorithm
 *
 * @param {Array<*>} arr - array of elements to shuffle
 * @param {function} [rng] - function returning floating point in range [0, 1)
 */
module.exports = function(arr, rng = Math.random) {
    if (arr && Array.isArray(arr) && rng && typeof rng === "function") {
        for (let i = arr.length - 1; i > 0; --i){
            swap(arr, i, getIndex(0, i, rng));
        }
        return true;
    } else {
        return false;
    }
}