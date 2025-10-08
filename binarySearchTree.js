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
      if (value < currentNode.data) {
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
      } else if (value === currentNode.data) {
        console.log('Sorry, this value is already there in the tree');
        return;
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

  find(value) {
    let currentNode = this.root;
    while (value !== currentNode.data) {
      if (value > currentNode.data) {
        if (currentNode.right === null) {
          return null;
        }
        currentNode = currentNode.right;
      } else if (value < currentNode.data) {
        if (currentNode.left === null) {
          return null;
        }
        currentNode = currentNode.left;
      }
    }
    return currentNode;
  }

  levelOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('You gotta add a callback function');
    } else {
      if (this.root === null) {
        console.log('Tree is empty');
      } else {
        const queue = [this.root];
        let currentNode = queue[queue.length - 1];

        while (currentNode) {
          callback(queue.shift());
          if (currentNode.left) {
            queue.push(currentNode.left);
          }
          if (currentNode.right) {
            queue.push(currentNode.right);
          }
          currentNode = queue[0];
        }
      }
    }
  }

  inOrderForEach(callback, subTree = this.root) {
    if (typeof callback !== 'function') {
      throw new Error('You gotta add a callback function');
    } else {
      if (subTree) {
        const left = this.inOrderForEach(callback, subTree.left);
        if (left) {
          callback(left);
        }
        callback(subTree);
        const right = this.inOrderForEach(callback, subTree.right);
        if (right) {
          callback(right);
        }
      }
    }
  }

  preOrderForEach(callback, subTree = this.root) {
    if (typeof callback !== 'function') {
      throw new Error('You gotta add a callback function');
    } else {
      if (subTree) {
        callback(subTree);
        const left = this.preOrderForEach(callback, subTree.left);
        if (left) {
          callback(left);
        }
        const right = this.preOrderForEach(callback, subTree.right);
        if (right) {
          callback(right);
        }
      }
    }
  }

  postOrderForEach(callback, subTree = this.root) {
    if (typeof callback !== 'function') {
      throw new Error('You gotta add a callback function');
    } else {
      if (subTree) {
        const left = this.postOrderForEach(callback, subTree.left);
        if (left) {
          callback(left);
        }
        const right = this.postOrderForEach(callback, subTree.right);
        if (right) {
          callback(right);
        }
        callback(subTree);
      }
    }
  }

  countTillNull(startNode, counter = 0, arrayOfResults = []) {
    if (startNode && !startNode.right && !startNode.left) {
      return 0;
    } else {
      const oldCounterValue = counter;
      if (startNode.right) {
        counter++;
        arrayOfResults.push(counter);
        this.countTillNull(startNode.right, counter, arrayOfResults);
      }
      counter = oldCounterValue;
      if (startNode.left) {
        counter++;
        arrayOfResults.push(counter);
        this.countTillNull(startNode.left, counter, arrayOfResults);
      }
      const highestValue = Math.max(...arrayOfResults);
      return highestValue;
    }
  }

  height(value) {
    let currentNode = this.root;
    while (value !== currentNode.data) {
      if (value > currentNode.data) {
        if (currentNode.right === null) {
          return null;
        }
        currentNode = currentNode.right;
      } else if (value < currentNode.data) {
        if (currentNode.left === null) {
          return null;
        }
        currentNode = currentNode.left;
      }
    }

    let nodeTargeted = currentNode;
    const counterResult = this.countTillNull(nodeTargeted, null);
    return counterResult;
  }

  depth(value) {
    let counter = 0;
    let currentNode = this.root;
    while (value !== currentNode.data) {
      if (value > currentNode.data) {
        if (currentNode.right === null) {
          return null;
        }
        currentNode = currentNode.right;
      } else if (value < currentNode.data) {
        if (currentNode.left === null) {
          return null;
        }
        currentNode = currentNode.left;
      }
      counter++;
    }
    return counter;
  }

  isBalanced(startNode = this.root) {
    if (!this.root) {
      console.log('Empty Tree');
      return;
    }
    if (startNode === null) {
      return;
    }
    let heightOfRight;
    if (startNode.right) {
      heightOfRight = this.countTillNull(startNode.right);
    }
    let heightOfLeft;
    if (startNode.left) {
      heightOfLeft = this.countTillNull(startNode.left);
    }

    if (
      Math.abs(heightOfLeft - heightOfRight) > 1 ||
      (heightOfLeft === undefined && heightOfRight > 0) ||
      (heightOfRight === undefined && heightOfLeft > 0)
    ) {
      return false;
    } else {
      let resultOfRight = this.isBalanced(startNode.right);
      if (resultOfRight === false) {
        return false;
      } else {
        let resultOfLeft = this.isBalanced(startNode.left);
        if (resultOfLeft === false) {
          return false;
        } else {
          return true;
        }
      }
    }
  }

  rebalance() {
    if (this.isBalanced()) {
      console.log(`already balanced`);
    } else {
      const arrayOfSortedNodesValues = [];
      this.inOrderForEach((element) => {
        arrayOfSortedNodesValues.push(element.data);
      });

      this.buildTree(arrayOfSortedNodesValues);
    }
  }
}

export { Tree };
