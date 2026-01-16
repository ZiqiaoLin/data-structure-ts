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

// const newBST = new BST();
// newBST.insert(40);
// newBST.insert(30);
// newBST.insert(10);
// newBST.insert(20);
// newBST.insert(50);
// newBST.insert(70);
// newBST.insert(80);
// console.log(newBST.min());
// console.log(newBST.max());
// console.log(newBST.recursiveSearch(25))
// newBST.recursiveInsert(5);
// console.log(newBST.min());
// console.log(newBST.recursiveMaxHeight())