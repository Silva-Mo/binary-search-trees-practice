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

export { mergeSort };
