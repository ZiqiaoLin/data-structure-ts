var ArrayStack = /** @class */ (function () {
    function ArrayStack() {
        this._arrayStack = [];
    }
    ArrayStack.prototype.push = function (value) {
        this._arrayStack.push(value);
    };
    ArrayStack.prototype.pop = function () {
        return this._arrayStack.pop();
    };
    ArrayStack.prototype.top = function () {
        return this._arrayStack[this._arrayStack.length - 1];
    };
    ArrayStack.prototype.isEmpty = function () {
        return this._arrayStack.length === 0;
    };
    ArrayStack.prototype.print = function () {
        console.log(this._arrayStack);
    };
    return ArrayStack;
}());
var as = new ArrayStack();
as.push(5);
as.push(6);
as.push(7);
as.push(8);
console.log(as.pop());
console.log(as.pop());
console.log(as.top());
as.print();
