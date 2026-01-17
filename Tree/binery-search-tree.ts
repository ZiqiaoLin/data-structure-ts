export class BSTNode<T> {
  value: T;
  left: BSTNode<T> | null = null;
  right: BSTNode<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }
 }

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
      if(newNode.value === temp.value) return undefined;
      if(newNode.value < temp.value) {
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

  search(value: T): boolean {
    if(!this.root) return false;
    let temp: BSTNode<T> | null = this.root;
    while(temp) {
      if(value < temp.value) {
        temp = temp.left;
      } else if(value > temp.value) {
        temp = temp.right;
      } else {
        return true;
      }
    }
    return false;
  }
  public remove(value: T): void {
    this.root = this._remove(this.root, value);
  }
  private _remove(node: BSTNode<T> | null, value: T): BSTNode<T> | null {
    if(!node) return null;
    if(value < node.value) { // -> left subtree
      node.left = this._remove(node.left, value);
      return node;
    } else if(value > node!.value) { // -> right subtree
      node.right = this._remove(node.right, value);
      return node;
    } else {  // find the targeted node
      if(!node.left && !node.right) {  // leaf node, return null to its parent node overwrite itself
        return null;
      } else if(!node.left) {  // one right child, return right child to parent node overwrite itself
        return node.right;
      } else if(!node.right) {  // one left child, return left child to parent node overwrite itself
        return node.left;
      } else {  // two children, find the min node in the right subtree, copy the value and remove the min node
        let temp = node.right;
        while(temp.left !== null) {
          temp = temp.left
        }
        node.value = temp.value;
        node.right = this._remove(node.right, temp.value);
        return node;
      }
    }
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

  min(): BSTNode<T> | null {
    if(!this.root) return null;
    let temp = this.root;
    while(temp.left !== null) {
      temp = temp.left;
    }
    return temp;
  }

  max(): BSTNode<T> | null {
    if(!this.root) return null;
    let temp = this.root;
    while(temp.right !== null) {
      temp = temp.right;
    }
    return temp;
  }

  public isValidBST(): boolean {
    return this._isValidBST(this.root, null, null);
  }

  private _isValidBST(node: BSTNode<T> | null, min: T | null, max: T | null): boolean {
    if(!node) return true;

    if(min !== null && node.value <= min!) return false;
    if(max !== null && node.value >= max!) return false;

    return this._isValidBST(node.left, min, node.value) && this._isValidBST(node.right, node.value, max);

  }
  
  // recursive insert
  public recursiveInsert(value: T): void {
    this.root = this._recursiveInsert(this.root, value)
  }

  private _recursiveInsert(node: BSTNode<T> | null, value: T): BSTNode<T> {
    if(node === null) {
      node = new BSTNode<T>(value);
      return node;
    } else if(value < node.value) {
      node.left = this._recursiveInsert(node.left, value)
    } else if(value > node.value) {
      node.right = this._recursiveInsert(node.right, value)
    } 
    return node;
  }
  
  // recursive search
  public recursiveSearch(value: T): boolean {
    return this._recursiveSearch(this.root, value);
  }
  
  private _recursiveSearch(node: BSTNode<T> | null, value: T): boolean {
    if(!node) return false;
    if(value === node.value) return true;
    if(value < node.value) {
      return this._recursiveSearch(node.left, value);
    } else {
      return this._recursiveSearch(node.right, value);
    }
  }
  
  // recursive find min value
  public recursiveMin(): BSTNode<T> | null {
    return this._recursiveMin(this.root);
  }

  private _recursiveMin(node: BSTNode<T> | null): BSTNode<T> | null {
    if(!node) return null;
    if(!node.left) return node;
    return this._recursiveMin(node.left);
  }
   
  // recursive find max height
  public recursiveMaxHeight(): number {
    return this._recursiveMaxHeight(this.root)
  }

  private _recursiveMaxHeight(node: BSTNode<T> | null): number {
    if(!node) return -1;
    return Math.max(this._recursiveMaxHeight(node.left), this._recursiveMaxHeight(node.right)) + 1;
  }

}

const newBST = new BST();
newBST.insert(40);
newBST.insert(30);
newBST.insert(10);
newBST.insert(20);
newBST.insert(50);
newBST.insert(-10);
newBST.insert(0);
console.log(newBST.remove(-10));
console.log(newBST.inorderDFS());
console.log(newBST.isValidBST());
// console.log(newBST.isValidBST());
// console.log(newBST.min());
// console.log(newBST.max());
// console.log(newBST.recursiveSearch(25))
// newBST.recursiveInsert(5);
// console.log(newBST.min());
// console.log(newBST.recursiveMaxHeight())