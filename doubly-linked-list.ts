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
  get() {}
  set() {}
  insert() {}
  remove() {}
  reverse() {}
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
dll.push(1);
dll.push(3);
dll.push(5);
dll.push(7);
dll.unshift(0);
dll.print();
console.log(dll.pop());
console.log(dll.shift());
console.log(dll.shift());
console.log(dll.pop());
console.log(dll.shift());
console.log(dll.shift());
dll.print();
