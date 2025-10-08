import { Tree } from './binarySearchTree.js';

// TOP TEST 1
const tree1 = new Tree();
tree1.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(tree1.isBalanced());
tree1.prettyPrint(tree1.root);

//PASSED

// TOP TEST 2
const tree = new Tree();

function createRandomNumbersArray(upTo, n) {
  let array = [];
  for (let index = 0; index < n; index++) {
    array.push(Math.floor(Math.random() * upTo));
  }
  return array;
}

tree.buildTree(createRandomNumbersArray(100, 20));

tree.prettyPrint(tree.root);

console.log(tree.isBalanced());

let orderArray = [];
tree.levelOrderForEach((element) => {
  orderArray.push(element.data);
});
console.log('level Order', orderArray);
orderArray = [];
tree.inOrderForEach((element) => {
  orderArray.push(element.data);
});
console.log('in-Order', orderArray);
orderArray = [];
tree.preOrderForEach((element) => {
  orderArray.push(element.data);
});
console.log('pre-Order', orderArray);
orderArray = [];
tree.postOrderForEach((element) => {
  orderArray.push(element.data);
});
console.log('post Order', orderArray);
orderArray = [];

for (let index = 0; index < 10; index++) {
  tree.insert(Math.floor(Math.random() * 100) + 100);
}

console.log(tree.isBalanced());

tree.rebalance();

tree.prettyPrint(tree.root);

tree.levelOrderForEach((element) => {
  orderArray.push(element.data);
});
console.log('level Order', orderArray);
orderArray = [];
tree.inOrderForEach((element) => {
  orderArray.push(element.data);
});
console.log('in-Order', orderArray);
orderArray = [];
tree.preOrderForEach((element) => {
  orderArray.push(element.data);
});
console.log('pre-Order', orderArray);
orderArray = [];
tree.postOrderForEach((element) => {
  orderArray.push(element.data);
});
console.log('post Order', orderArray);
orderArray = [];

console.log(tree.isBalanced());
//PASSED
