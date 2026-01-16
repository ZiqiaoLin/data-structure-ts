class LinkedNode<T> {
  value: T;
  next: LinkedNode<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }
}

class LinkedListQueue<T> {
  private _head: LinkedNode<T> | null = null;
  private _tail: LinkedNode<T> | null = null;
  private _length: number = 0;
  constructor() {}
  get size(): number {
    return this._length;
  }
  enqueue(value: T): void {
    const newNode = new LinkedNode(value);
    if(this.isEmpty()) {
      this._head = newNode;
      this._tail = newNode;
    } else {
      this._tail!.next = newNode;
      this._tail = newNode;
    }
    this._length++;
  }

  dequeue(): T | null {
    if(this.isEmpty()) return null;
    const temp = this._head;
    this._head = this._head!.next;
    temp!.next = null;
    this._length--;
    if(this.isEmpty()) {
      this._tail = null;
    }
    return temp!.value;
  }

  isEmpty(): boolean {
    return this._length === 0;
  }

  peek(): T | null {
    if(this.isEmpty()) return null;
    return this._head!.value;
  }

}