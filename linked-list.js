var ListNode = /** @class */ (function () {
    function ListNode(value) {
        this.next = null;
        this.value = value;
    }
    return ListNode;
}());
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    LinkedList.prototype.push = function (value) {
        var newNode = new ListNode(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
        return this;
    };
    LinkedList.prototype.unshift = function (value) {
        var newNode = new ListNode(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this;
    };
    LinkedList.prototype.shift = function () {
        if (!this.head)
            return null;
        var temp = this.head;
        this.head = this.head.next;
        temp.next = null;
        this.length--;
        if (this.length === 0) {
            this.tail = null;
        }
        return temp;
    };
    LinkedList.prototype.pop = function () {
        if (!this.head)
            return null;
        var temp = this.head;
        var prev = this.head;
        while (temp.next) {
            prev = temp;
            temp = temp.next;
        }
        this.tail = prev;
        this.tail.next = null;
        this.length--;
        if (this.length === 0) {
            this.head = null;
            this.tail = null;
        }
        return temp;
    };
    LinkedList.prototype.get = function (index) {
        if (index < 0 || index >= this.length)
            return null;
        var temp = this.head;
        for (var i = 0; i < index; i++) {
            temp = temp.next;
        }
        return temp;
    };
    LinkedList.prototype.set = function (index, value) {
        var temp = this.get(index);
        if (!temp)
            return false;
        temp.value = value;
        return true;
    };
    LinkedList.prototype.insert = function (index, value) {
        if (index < 0 || index > this.length)
            return false;
        if (index === 0) {
            this.unshift(value);
            return true;
        }
        if (index === this.length) {
            this.push(value);
            return true;
        }
        var newNode = new ListNode(value);
        var prev = this.get(index - 1);
        newNode.next = prev.next;
        prev.next = newNode;
        this.length++;
        return true;
    };
    LinkedList.prototype.remove = function (index) {
        if (index < 0 || index >= this.length)
            return null;
        if (index === 0)
            return this.shift();
        if (index === this.length - 1)
            return this.pop();
        var prev = this.get(index - 1);
        var temp = prev.next;
        prev.next = temp.next;
        temp.next = null;
        this.length--;
        return temp;
    };
    LinkedList.prototype.printList = function () {
        var temp = this.head;
        while (temp !== null) {
            console.log(temp.value);
            temp = temp.next;
        }
    };
    LinkedList.prototype.reverse = function () {
        if (!this.head)
            return this;
        var temp = this.head;
        this.head = this.tail;
        this.tail = temp;
        var prev = null;
        var next = null;
        for (var i = 0; i < this.length; i++) {
            next = temp.next;
            temp.next = prev;
            prev = temp;
            temp = next;
        }
        return this;
    };
    LinkedList.prototype.reversePrint = function () {
        this._reversePrintPrivate(this.head);
    };
    LinkedList.prototype._reversePrintPrivate = function (node) {
        if (node === null)
            return;
        this._reversePrintPrivate(node.next);
        console.log(node.value);
    };
    LinkedList.prototype.reverseRecursive = function () {
        if (!this.head)
            return;
        var oldHead = this.head;
        this.head = this._reverseRecursivePrivate(this.head);
        this.tail = oldHead;
    };
    LinkedList.prototype._reverseRecursivePrivate = function (node) {
        if (!node || !node.next) {
            return node;
        }
        var newHead = this._reverseRecursivePrivate(node.next);
        node.next.next = node;
        node.next = null;
        return newHead;
    };
    return LinkedList;
}());
var nodes = new LinkedList();
nodes.push(1);
nodes.push(2);
nodes.push(3);
nodes.push(4);
nodes.push(5);
nodes.push(6);
nodes.reverseRecursive();
nodes.printList();
