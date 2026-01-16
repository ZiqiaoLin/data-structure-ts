import { BSTNode } from "./binery-search-tree.js";

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

  public preorderDFS(): T[] {
    const result: T[] = [];
    this._preorderDFS(this.root, result);
    return result;
  }

  private _preorderDFS(node: BSTNode<T> | null, data: T[]): void {
    if(!node) return;
    data.push(node.value);
    this._preorderDFS(node.left, data);
    this._preorderDFS(node.right, data);
  }

  public inorderDFS(): T[] {
    const result: T[] = [];
    this._inorderDFS(this.root, result);
    return result;
  }

  private _inorderDFS(node: BSTNode<T> | null, data: T[]): void {
    if(!node) return;
    this._inorderDFS(node.left, data);
    data.push(node.value);
    this._inorderDFS(node.right, data);
  }
  
  public postorderDFS(): T[] {
    const result: T[] = [];
    this._postorderDFS(this.root, result);
    return result;
  }

  private _postorderDFS(node: BSTNode<T> | null, data: T[]): void {
    if(!node) return;
    this._postorderDFS(node.left, data);
    this._postorderDFS(node.right, data);
    data.push(node.value);
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

console.log(bst.preorderDFS());
console.log(bst.inorderDFS());
console.log(bst.postorderDFS());