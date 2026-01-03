class ArrayStack<T> {
  private _arrayStack: T[] = [];
  constructor() {}

  push(value: T): void {
    this._arrayStack.push(value);
  }

  pop(): T | undefined {
    return this._arrayStack.pop();
  }

  top(): T | undefined {
    return this._arrayStack[this._arrayStack.length - 1];
  }

  isEmpty(): boolean {
    return this._arrayStack.length === 0;
  }

  print(): void {
    console.log(this._arrayStack)
  }
}

const as = new ArrayStack();
as.push(5);
as.push(6);
as.push(7);
as.push(8);
console.log(as.pop())
console.log(as.pop())
console.log(as.top())
as.print()