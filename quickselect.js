/**
 * Find k-th value in array, based on comparator.
 * If answer is NaN, error in arguments or in function 
 * @param {Array} arrayToSearch - input array
 * @param {Number} k - 1-based thing to find
 * @param {Function} [compareFunction] - optional, default is find k-th smallest
 */
const quickSelect = (function(){
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
     * Default comparator for quickselect
     * @param {*} a 
     * @param {*} b 
     */
    function defaultCompare(a, b) {
        return a - b;
    }

    /**
     * Swap elements in arr[i] and arr[j]
     * @param {Array} arr
     * @param {Number} i 
     * @param {Number} j 
     */
    function swap(arr, i, j) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    /**
     * Main quickselect logic, acting on static arr variable
     * @param {Array} arr - array to search
     * @param {Number} k - kth item to return 
     * @param {Function} [comparator] - optional, default is find k-th smallest
     */
    function iterativeQuickSelect(arr, k, comparator = defaultCompare){
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

    return function(arrayToSearch, k, compareFunction) {
        let ans = NaN;
        if (arrayToSearch && Array.isArray(arrayToSearch) && k && Number.isInteger(k)) {
            if (compareFunction && typeof compareFunction == "function") {
                ans = iterativeQuickSelect(arrayToSearch, k, compareFunction);
            } else {
                ans = iterativeQuickSelect(arrayToSearch, k);
            }
        }
        return ans;
    }
})();

module.exports = quickSelect;