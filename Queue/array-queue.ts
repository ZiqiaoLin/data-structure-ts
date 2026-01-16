class ArrayQueue<T> {
  private _queue: (T | null)[];
  private _head: number = 0;
  private _tail: number = 0;  // next insert position
  private _size: number = 0;
  private _capacity: number;
  constructor(initialCapacity: number = 8) {
    this._capacity = initialCapacity;
    this._queue = new Array(this._capacity).fill(null);
  }

  enqueue(item: T): void{
    if(this.isFull()) {
      this.resize();
    }
    this._queue[this._tail] = item;
    this._tail = (this._tail + 1) % this._capacity;
    this._size++
  }

  dequeue(): T | null {
    if(this.isEmpty()) return null;
    const item = this._queue[this._head]!;
    this._queue[this._head] = null;
    this._head = (this._head + 1) % this._capacity;
    this._size--;
    return item;
  }

  peek(): T | null {
    if(this.isEmpty()) return null;
    return this._queue[this._head]!;
  }

  isFull(): boolean {
    return this._size === this._capacity;
  }

  isEmpty(): boolean {
    return this._size === 0;
  }

  getSize(): number {
    return this._size;
  }
  resize(): void {
    const oldCapacity = this._capacity;
    this._capacity = this._capacity * 2;
    const newQueue = new Array(this._capacity).fill(null);
    for(let i = 0; i < this._size; i++) {
      newQueue[i] = this._queue[(this._head + i) % oldCapacity];
    }
    this._queue = newQueue;
    this._head = 0;
    this._tail = this._size;
  }
}

const q = new ArrayQueue();
q.enqueue(1);
q.enqueue(2);
q.enqueue(3);
q.enqueue(4);
q.enqueue(5);
q.enqueue(6);
q.enqueue(7);
q.enqueue(8);
q.dequeue();
q.enqueue(8);
console.log(q);
