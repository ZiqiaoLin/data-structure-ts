class DoublyLinkNode<T>{
  value: T;
  prev: DoublyLinkNode<T> | null = null;
  next:DoublyLinkNode<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }
}

class DoublyLinkedList<T> {
  head: DoublyLinkNode<T> | null = null;
  tail: DoublyLinkNode<T> | null = null;
  length: number = 0;
  constructor() {}

  push(value: T): DoublyLinkedList<T>{
    const newNode = new DoublyLinkNode<T>(value);
    if(!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  unshift(value: T): DoublyLinkedList<T> {
    const newNode = new DoublyLinkNode(value);
    if(!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.length++;
    return this;
  }
  pop(): DoublyLinkNode<T> | null{
    if(!this.head) return null;
    const temp = this.tail;
    if(this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length--;
      return temp;
    }
    this.tail = this.tail!.prev;
    this.tail!.next = null;
    temp!.prev = null;
    this.length--;
    return temp;
  }

  shift(): DoublyLinkNode<T> | null {
    if(!this.head) return null;
    const temp = this.head;
    if(this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length--;
      return temp;
    }
    this.head = this.head.next;
    this.head!.prev = null;
    temp.next = null;
    this.length--;
    return temp;
  }
  get(index: number): DoublyLinkNode<T> | null {
    if(index < 0 || index >= this.length) return null;
    let temp = (index < this.length / 2) ? this.head! : this.tail!;
    if(index < this.length / 2) {
      for(let i = 0; i < index; i++) temp = temp.next!;
    } else {
      for(let i = this.length - 1; i > index; i--) temp = temp.prev!;
    }
    return temp;
  }

  set(index: number, value: T): boolean {
    const getNode = this.get(index);
    getNode!.value = value;
    return true; 
  }
  insert(index: number, value: T): boolean {
    if(index < 0 || index > this.length) return false;
    if(index === 0) {
      this.unshift(value);
      return true;
    }
    if(index === this.length) {
      this.push(value);
      return true;
    }
    const newNode = new DoublyLinkNode(value);
    const oldNode = this.get(index);
    newNode.next = oldNode;
    newNode.prev = oldNode!.prev;
    newNode.prev!.next = newNode;
    oldNode!.prev = newNode;
    this.length++;
    return true;
  }
  remove(index: number): DoublyLinkNode<T> | null {
    if(index < 0 || index >= this.length) return null;
    if(index === 0) return this.shift();
    if(index === this.length - 1) return this.pop();
    const temp = this.get(index);
    temp!.prev!.next = temp!.next;
    temp!.next!.prev = temp!.prev;
    temp!.prev = null;
    temp!.next = null;
    this.length--;
    return temp;
  }
  reverse(): this {
    let temp: DoublyLinkNode<T> | null = null;
    let curr: DoublyLinkNode<T> | null = this.head;
    while(curr) {
      temp = curr.next;
      curr.next = curr.prev;
      curr.prev = temp;
      curr = temp;
    }
    temp = this.head;
    this.head = this.tail;
    this.tail = temp;
    return this;
  }
  print(): void {
    let temp = this.head;
    let result: string = '';
    while(temp) {
      result += `${temp.value} ${temp.next ? '<-> ' : ''}`;
      temp = temp.next;
    }
    console.log(result);
  }
}

const dll = new DoublyLinkedList();
// dll.push(1);
// dll.push(3);
// dll.push(5);
// dll.push(7);
// dll.unshift(0);
// dll.print();
dll.reverse();
dll.print();
// console.log(dll.remove(2))
// console.log(dll.remove(3))
// console.log(dll.remove(2))
// console.log(dll.get(3))
// console.log(dll.set(3, 100))
// console.log(dll.insert(0,10))
// console.log(dll.insert(3,20))
// console.log(dll.insert(5,30))


// console.log(dll.pop());
// console.log(dll.shift());
// console.log(dll.shift());
// console.log(dll.pop());
// console.log(dll.shift());
// console.log(dll.shift());
// dll.print();
