class NodeQueue<T> {
  value: T;
  next: NodeQueue<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }
}

class NodeBST<T> {
  value: T;
  left: NodeBST<T> | null = null;
  right: NodeBST<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }
}

class Queue<T> {
  head: NodeQueue<T> | null = null;
  tail: NodeQueue<T> | null = null;
  length: number = 0;
  constructor() {}
  enqueue(value: T): void {
    const newNode = new NodeQueue(value);
    if(this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  dequeue(): T | null {
    if(this.isEmpty()) return null;
    const temp = this.head;
    this.head = this.head!.next;
    temp!.next = null;
    this.length--;
    if(this.isEmpty()) {
      this.tail = null;
    }
    return temp!.value;
  }

  isEmpty(): boolean {
    return this.length === 0;
  }
}

class BST<T> {
  root: NodeBST<T> | null = null;
  constructor() {}

  insert(value: T): BST<T> | undefined {
    const newNode = new NodeBST(value);
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
    const queue = new Queue<NodeBST<T>>();
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