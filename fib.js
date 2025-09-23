function fibsRec(nth, previousNumber = 0, value = 1, array = [0, 1]) {
  if (nth === 0) return [];
  if (nth === 1) return [0];
  if (array.length === nth) {
    return array;
  }
  const previous = value;
  value = previousNumber + value;
  array.push(value);
  return fibsRec(nth, previous, value, array);
}

function fibs(nth) {
  if (nth === 0) return [];
  if (nth === 1) return [0];
  let previousNumber = 0;
  let value = 1;
  let array = [0, 1];
  for (let i = 0; i < nth - 2; i++) {
    const previous = value;
    value = previousNumber + value;
    previousNumber = previous;
    array.push(value);
  }

  return array;
}

console.log('Edge Cases:');
console.log('fibs(0):', fibs(0)); // Expected: []
console.log('fibsRec(0):', fibsRec(0)); // Expected: []
console.log('fibs(1):', fibs(1)); // Expected: [0]
console.log('fibsRec(1):', fibsRec(1)); // Expected: [0]

// Small Values
console.log('\nSmall Values:');
console.log('fibs(2):', fibs(2)); // Expected: [0, 1]
console.log('fibsRec(2):', fibsRec(2)); // Expected: [0, 1]
console.log('fibs(3):', fibs(3)); // Expected: [0, 1, 1]
console.log('fibsRec(3):', fibsRec(3)); // Expected: [0, 1, 1]
console.log('fibs(4):', fibs(4)); // Expected: [0, 1, 1, 2]
console.log('fibsRec(4):', fibsRec(4)); // Expected: [0, 1, 1, 2]

// Assignment Requirements
console.log('\nAssignment Requirements:');
console.log('fibs(8):', fibs(8)); // Expected: [0, 1, 1, 2, 3, 5, 8, 13]
console.log('fibsRec(8):', fibsRec(8)); // Expected: [0, 1, 1, 2, 3, 5, 8, 13]

// Larger Values
console.log('\nLarger Values:');
console.log('fibs(10):', fibs(10)); // Expected: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
console.log('fibs(12):', fibs(12)); // Expected: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]

//PASSED, yay!
