class LinkedNode<T> {
  value: T;
  next: LinkedNode<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }
}

class LinkedListStack<T> {
  head: LinkedNode<T> | null = null;
  length: number = 0;
  constructor() {}
  push(value: T): void {
    const newNode = new LinkedNode(value);
    if(!this.head) {
      this.head = newNode;
      this.length++;
      return;
    }
    newNode.next = this.head;
    this.head = newNode;
    this.length++;
    return;
  }
  pop(): T | null {
    if(!this.head) return null;
    const temp = this.head;
    this.head = this.head.next;
    this.length--;
    return temp.value;
  }
  top(): T | null {
    if(!this.head) return null;
    return this.head.value;
  }
  isEmpty(): boolean {
    return this.head === null;
  }
  
}