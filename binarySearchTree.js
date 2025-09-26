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
}

let tree = new Tree('Ok');
tree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.prettyPrint(tree.root);
