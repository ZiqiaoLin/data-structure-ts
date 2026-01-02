class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }
}

class LinkedList<T> {
  head: ListNode<T> | null = null;
  tail: ListNode<T> | null = null;
  length: number = 0;
  constructor() {}

  push(value: T): LinkedList<T> {
    const newNode = new ListNode<T>(value);
    if(!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  unshift(value: T): LinkedList<T> {
    const newNode = new ListNode<T>(value);
    if(!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  shift(): ListNode<T> | null {
    if(!this.head) return null;
    const temp = this.head;
    this.head = this.head.next;
    temp.next = null;
    this.length--;
    if(this.length === 0){
      this.tail = null;
    }
    return temp;
  }

  pop(): ListNode<T> | null {
    if(!this.head) return null;
    let temp = this.head;
    let prev = this.head;
    while(temp.next) {
      prev = temp;
      temp = temp.next;
    }
    this.tail = prev;
    this.tail.next = null;
    this.length--;
    if(this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return temp;
  }
  
  get(index: number): ListNode<T> | null {
    if(index < 0 || index >= this.length) return null;
    let temp = this.head;
    for(let i = 0; i < index; i++) {
      temp = temp!.next;
    }
    return temp;
  }

  set(index: number, value: T): boolean{
    let temp = this.get(index);
    if(!temp) return false;
    temp.value = value;
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
    const newNode = new ListNode(value);
    const prev = this.get(index - 1);
    newNode.next = prev!.next
    prev!.next = newNode;
    this.length++
    return true;
  }

  remove(index: number): ListNode<T> | null {
    if(index < 0 || index >= this.length) return null;
    if(index === 0) return this.shift();
    if(index === this.length - 1) return this.pop();
    const prev = this.get(index - 1);
    const temp = prev!.next;
    prev!.next = temp!.next;
    temp!.next = null;
    this.length--;
    return temp;
  }

  reverse(): LinkedList<T> | null{
    if(!this.head) return null;
    let temp: ListNode<T> | null = this.head;
    this.head = this.tail;
    this.tail = temp;
    let prev: ListNode<T> | null = null;
    let next: ListNode<T> | null = null;
    for(let i = 0; i < this.length; i++) {
      next = temp!.next;
      temp!.next = prev;
      prev = temp;
      temp = next;
    }
    return this; 
  }
  
  
}