'use strict';

/**
 * In place TODO"non-stable" heap sort implementation
 * @param {Array<*>} arr array to sort
 * @param {Function} compareFunction default is comparing numbers within array
 * @returns {Array<*>} sorted, default numerical ascending order
 */
const heapSort = (function(){
    let comparator = defaultCompare;
    
    /**
     * Default comparator for heapsort,
     * will sort numbers in increasing order
     * @param {Number} a 
     * @param {Number} b 
     */
    function defaultCompare(a, b) {
        return a-b;
    }

    /**
     * Swap arr[i] and arr[j]
     * @param {Array<any>} arr 
     * @param {Number} i 
     * @param {Number} j 
     */
    function swap(arr, i, j) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    /**
     * Helper function for arrayToHeap()
     * @param {Array<*>} arr 
     * @param {Number} index 
     */
    function propagateUp(arr, index){
        let parentIndex = Math.trunc((index - 1) / 2);
        while (parentIndex >= 0 && comparator(arr[parentIndex], arr[index]) > 0) {
            swap(arr, parentIndex, index);   
            index = parentIndex;
            parentIndex = Math.trunc((index - 1) / 2);     
        } 
    }

    /**
     * Helper function for heapToArray()
     * @param {Array<*>} arr 
     * @param {Number} index 
     */
    function propagateDown(arr, index){
        let n = 0;
        let indexFirstChild = 2*n + 1;
        let indexSecondChild = 2*n + 2;
        while (indexFirstChild < index) {
            if (indexSecondChild >= index || comparator(arr[indexFirstChild], arr[indexSecondChild]) <= 0) {
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
     * @param {Array<*>} arr 
     */
    function arrayToHeap(arr){
        for (let x = 0; x < arr.length; ++x) {
            propagateUp(arr, x);
        }
    }

    /**
     * Shorten heap, while lengthening sorted array, in place
     * @param {Array<*>} arr 
     */
    function heapToArray(arr){
        let x = arr.length - 1;
        while (x > 0) {
            swap(arr, 0, x);
            --x;
            propagateDown(arr, x);
        }
    }

    // TODO sorting array has slight errors, also in opposite order
    return function(arr, compareFunction){
        if (arr && Array.isArray(arr)) {
            if (compareFunction && typeof compareFunction === "function") {
                comparator = compareFunction;
            }
            arrayToHeap(arr);
            heapToArray(arr);
            comparator = defaultCompare;
        }
        return arr;
    }
})();

// TODO 93 and 54 swap in wrong order
console.log(heapSort([4,3,3,-2,11,93,123,4,54, -4, -4, -1, 0 ,0 ]));

module.exports = heapSort;
