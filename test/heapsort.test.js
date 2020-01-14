'use strict';

const libfelix = require('../index');
const heapSort = libfelix.Algo.heapsort;

test('heapsort invalid', ()=>{
    expect(heapSort(null)).toEqual(null);
    expect(heapSort(undefined)).toEqual(undefined);
    expect(heapSort(true)).toEqual(true);
    expect(heapSort(false)).toEqual(false);
    expect(heapSort(123)).toEqual(123);
});

test('heapsort strings', ()=>{
    expect(heapSort("libfelixjs")).toEqual("libfelixjs");
    expect(heapSort('nani')).toEqual('nani');
    let str = "bacd";
    expect(heapSort(str)).toEqual(str);
});


test('heapsort objects', ()=>{


});


test('heapsort arrays', ()=>{
    let arr = [4,3,3,-2,11,93,123,4,54,-4,-4,-1,0,0];
    let sortedArr = Array.from(arr);
    sortedArr.sort((a,b)=>a-b);
    expect(arr).not.toEqual(sortedArr);
    expect(heapSort(arr)).toEqual(sortedArr);
});

