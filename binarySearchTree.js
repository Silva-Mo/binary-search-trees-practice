import { mergeSort } from './merge.js';
import { removeDuplicates } from './removeDuplicates.js';

class Node {
  constructor(data) {
    (this.data = data), (this.right = null), (this.left = null);
  }
}

class Tree {
  constructor(root) {
    this.root = root;
  }

  buildTree(array) {
    if (array.length === 0) {
      return null;
    }
    const newArray = mergeSort(removeDuplicates(array));

    const mid = Math.floor((newArray.length - 1) / 2);

    const start = 0;
    const end = newArray.length;

    const root = new Node(newArray[mid]);
    const leftSide = newArray.slice(start, mid);
    const rightSide = newArray.slice(mid + 1, end);

    root.right = this.buildTree(rightSide);
    root.left = this.buildTree(leftSide);

    this.root = root;
    return root;
  }

  prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  insert(value, currentNode = this.root) {
    const newVal = new Node(value);
    if (this.root === null) {
      this.root = newVal;
    } else {
      if (value <= currentNode.data) {
        if (currentNode.left === null) {
          currentNode.left = newVal;
        } else {
          this.insert(value, currentNode.left);
        }
      } else if (value > currentNode.data) {
        if (currentNode.right === null) {
          currentNode.right = newVal;
        } else {
          this.insert(value, currentNode.right);
        }
      }
    }
  }

  deleteItem(value, prevNode = null, currentNode = this.root) {
    if (this.root === null) {
      console.log('Tree is empty, there is nothing to delete !');
    } else if (currentNode === null) {
      console.log('There is no such a value');
    } else {
      if (value === currentNode.data) {
        if (currentNode.right === null && currentNode.left === null) {
          if (prevNode === null) {
            this.root = null;
          } else {
            if (value <= prevNode.data) {
              prevNode.left = null;
            } else {
              prevNode.right = null;
            }
          }
        } else if (currentNode.right !== null && currentNode.left !== null) {
          let InorderSuccessor = currentNode.right;
          let counter = 0;
          while (InorderSuccessor.left !== null) {
            counter += 1;
            InorderSuccessor = InorderSuccessor.left;
          }
          const dataOfInorderSuccesoor = InorderSuccessor.data;
          InorderSuccessor.data = currentNode.data;
          currentNode.data = dataOfInorderSuccesoor;
          if (counter === 0) {
            currentNode.right = InorderSuccessor.right;
          } else {
            let numberOfNode = 1;
            let node = currentNode.right;
            while (numberOfNode !== counter) {
              numberOfNode += 1;
              node = node.left;
            }
            node.left = InorderSuccessor.right;
          }
        } else if (currentNode.right !== null || currentNode.left !== null) {
          if (prevNode === null) {
            if (currentNode.right) {
              this.root = currentNode.right;
            } else {
              this.root = currentNode.left;
            }
          } else {
            if (currentNode.right !== null) {
              if (currentNode.right.data > prevNode.data) {
                prevNode.right = currentNode.right;
              } else {
                prevNode.left = currentNode.right;
              }
            } else {
              if (currentNode.left.data > prevNode.data) {
                prevNode.right = currentNode.left;
              } else {
                prevNode.left = currentNode.left;
              }
            }
          }
        }
      } else if (value > currentNode.data) {
        this.deleteItem(value, currentNode, currentNode.right);
      } else if (value < currentNode.data) {
        this.deleteItem(value, currentNode, currentNode.left);
      }
    }
  }
}

const tree = new Tree();
tree.buildTree([5, 3, 7, 2, 4, 6, 8]);
tree.deleteItem(5); // Root deletion - likely to break
tree.prettyPrint(tree.root);

// let tree = new Tree('Ok');
// tree.buildTree([
//   1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 2, 4, 4.5, 5.5, 66, 6.3, 7.8,
//   9.9, 10000,
// ]);

// tree.deleteItem(7.8);
// tree.deleteItem(8);
// tree.deleteItem(10000);
// tree.deleteItem(4.5);
// tree.deleteItem(1);
// tree.deleteItem(2);
// tree.deleteItem(0);
// tree.deleteItem(6.3);
// tree.deleteItem(9);
// tree.deleteItem(324);
// tree.deleteItem(6345);
// tree.deleteItem(9.9);
// tree.deleteItem(23);
// tree.deleteItem(67);
// tree.deleteItem(66);
// tree.deleteItem(5);
// tree.deleteItem(5.5);
// tree.deleteItem(3);
// tree.deleteItem(7);
// tree.deleteItem(4);
// tree.deleteItem(0);
// tree.prettyPrint(tree.root);
