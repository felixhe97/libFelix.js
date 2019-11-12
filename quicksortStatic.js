/**
 * In-place recursive quicksort on the indices
 * @param {Array} arrayToSort - Array to sort
 * @param {Function} [compareFunction] - optional custom comparator
 * @return {Array} - also returns the sorted Array for chaining function calls
 */
const quickSort = (function(){
    /**
     * Get random number within range of [incMin, incMax]
     * @param {Number} incMin 
     * @param {Number} incMax 
     * @returns {Number}
     */
    function getRandIndex(incMin, incMax) {
        incMin = Math.ceil(incMin);
        incMax = Math.floor(incMax);
        return Math.floor(Math.random() * (incMax - incMin + 1)) + incMin;
    }
    
    /**
     * Default comparator for quicksort, acts on Numbers
     * If a should appear before b, return negative or zero
     * If a should appear after b, return non-zero positive number
     * @param {Number} a
     * @param {Number} b 
     */
    function defaultCompare(a, b){
        return a - b;
    }
    // for scoping without recursive calls having to pass
    // same array or function arguments repeatedly
    let arr = null;
    let comparator = defaultCompare;

     /**
     * Swap values of arr[i] and arr[j]
     * @param {*} i 
     * @param {*} j 
     */
    function swap(i, j) {
        let valA = arr[i];
        arr[i] = arr[j];
        arr[j] = valA;
    }

    /**
     * Quicksort partition array
     * @param {Number} begin - index of array 
     * @param {Number} end - index of array
     */
    function partition(begin, end){
        if (begin < end) {
            let pivotIndex = getRandIndex(begin, end);
            let pivot = arr[pivotIndex];
            swap(pivotIndex, end);
            let i = begin;
            let j = end - 1;
            // TODO
            while (i <= j) {
                if (comparator(arr[i], pivot) <= 0) {
                    ++i;
                } else {
                    swap(i, j);
                    --j;
                }
            }
            swap(i, end);
            partition(begin, i - 1);
            partition(i + 1, end);
        }
    }

    return function(arrayToSort, compareFunction) {
        if (arrayToSort && Array.isArray(arrayToSort)) {
            arr = arrayToSort;
            if (compareFunction && typeof compareFunction == "function") {
                comparator = compareFunction;
                partition(0, arr.length - 1);
                comparator = defaultCompare;
            } else {
                partition(0, arr.length - 1);
            }
            arr = null;
        }
        return arrayToSort;
    }
})();

module.exports = quickSort;