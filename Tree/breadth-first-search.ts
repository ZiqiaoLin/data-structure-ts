import { LinkedListQueue } from '../Queue/linked-list-queue.js'
import { BSTNode } from './binery-search-tree.js'

class BST<T> {
  root: BSTNode<T> | null = null;
  constructor() {}

  insert(value: T): BST<T> | undefined {
    const newNode = new BSTNode(value);
    if(!this.root) {
      this.root = newNode;
      return this;
    }
    let temp = this.root;
    while(true) {
      if(temp.value === newNode.value) return undefined;
      if(temp.value > newNode.value) {
        if(temp.left === null) {
          temp.left = newNode;
          return this;
        }
        temp = temp.left;
      } else {
         if(temp.right === null) {
           temp.right = newNode;
           return this;
         }
         temp = temp.right;
      }
    }
  }

  BFS(): T[] {
    if(!this.root) return [];
    const result: T[] = [];
    const queue = new LinkedListQueue<BSTNode<T>>();
    queue.enqueue(this.root);
    while(!queue.isEmpty()) {
      const curr = queue.dequeue()!;
      result.push(curr.value);
      if(curr.left) {
        queue.enqueue(curr.left)
      }
      if(curr.right) {
        queue.enqueue(curr.right)
      }
    }
    return result;
  }
}

const bst = new BST();
bst.insert(50);
bst.insert(30);
bst.insert(40);
bst.insert(60);
bst.insert(10);
bst.insert(20);
bst.insert(70);
bst.insert(80);

console.log(bst.BFS())