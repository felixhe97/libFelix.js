'use strict';

/**
 * Get random floating point in range of [min, max)
 *
 * @param {number} min
 * @param {number} max
 * @param {function} [rng] - function returning floating point in range [0, 1)
 * @returns {number}
 */
module.exports.getRandomNum = function(min, max, rng = Math.random) {
    return rng() * (min - max) + max;
}

/**
 * Get random integer in range of [min, max)
 *
 * @param {number} min
 * @param {number} max
 * @param {function} [rng] - function returning floating point in range [0, 1)
 * @returns {number}
 */
module.exports.getRandomInt = function(min, max, rng = Math.random) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(rng() * (max - min)) + max;
}

/**
 * Get random integer in range of [min, max]
 *
 * @param {number} min
 * @param {number} max
 * @param {function} [rng] - function returning floating point in range [0, 1)
 * @returns {number}
 */
module.exports.getRandomIntInclusive = function(min, max, rng = Math.random) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(rng() * (max - min + 1)) + min;
}