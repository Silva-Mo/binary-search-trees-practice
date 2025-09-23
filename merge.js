function mergeSort(array) {
  let newArray = [];
  if (array.length === 1) {
    newArray = array;
  } else {
    let leftSide, rightSide;
    const m = Math.floor(array.length / 2);
    [leftSide, rightSide] = [array.slice(0, m), array.slice(m, array.length)];
    const sortLeft = mergeSort(leftSide);
    const sortRight = mergeSort(rightSide);
    const length = sortRight.length + sortLeft.length;
    for (let i = 0; i < length; i++) {
      if (sortRight[0] === undefined) {
        newArray[i] = sortLeft.shift();
      } else if (sortLeft[0] === undefined) {
        newArray[i] = sortRight.shift();
      } else if (sortLeft[0] < sortRight[0]) {
        newArray[i] = sortLeft.shift();
      } else if (sortLeft[0] > sortRight[0]) {
        newArray[i] = sortRight.shift();
      } else {
        newArray[i] = sortLeft.shift();
      }
    }
  }
  return newArray;
}

// 1. Simple unsorted array
console.log(mergeSort([3, 1, 4, 2]));
// Expected: [1, 2, 3, 4]

// 2. Already sorted array
console.log(mergeSort([1, 2, 3, 4]));
// Expected: [1, 2, 3, 4]

// 3. Reverse sorted array
console.log(mergeSort([4, 3, 2, 1]));
// Expected: [1, 2, 3, 4]

console.log(mergeSort([42]));
// Expected: [42]

// 6. Two-element array
console.log(mergeSort([2, 1]));
// Expected: [1, 2]

// 7. Array with duplicates
console.log(mergeSort([3, 3, 1, 1, 2]));
// Expected: [1, 1, 2, 3, 3]

// 8. All identical elements
console.log(mergeSort([7, 7, 7]));
// Expected: [7, 7, 7]

console.log(mergeSort([-3, -1, -2, -4]));
// Expected: [-4, -3, -2, -1]

// 12. Mixed positive/negative
console.log(mergeSort([0, -1, 1, -2, 2]));
// Expected: [-2, -1, 0, 1, 2]

// 13. Floating point numbers
console.log(mergeSort([3.5, 1.1, 2.8]));
// Expected: [1.1, 2.8, 3.5]

// 14. Assignment required test cases
console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]));
// Expected: [0, 1, 1, 2, 3, 5, 8, 13]

console.log(mergeSort([105, 79, 100, 110]));
// Expected: [79, 100, 105, 110]

//PASSED, yay!
