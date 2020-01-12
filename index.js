'use strict';

module.exports = {
    "Algo" : {
        "heapsort": require('./algo/heapsort'),
        "mergesort": require('./algo/mergesort'),
        "quickselect": require('./algo/quickselect'),
        "quicksort": require('./algo/quicksort')
    },
    "DS" : {
        "adjacencylist": require('./ds/adjacencylist'),
        "binaryheap": require('./ds/binaryheap'),
        "deque": require('./ds/deque'),
        "trie": require('./ds/trie'),
        "unionfind": require('./ds/unionfind')
    }
};
