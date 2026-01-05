import { LinkedListStack } from "../linked-list-stack";

function checkBalancedParentheses(str: string): boolean {
  const stack = new LinkedListStack<string>();
  const matchMap: Record<string, string> = {
    ')': '(',
    '}': '{',
    ']': '['
  };
  
  for(const s of str) {
    if(s === '(' || s === '[' || s === '{') {
      stack.push(s);
    } else if(s in matchMap) {
      if (stack.isEmpty() || stack.top() !== matchMap[s]) {
        return false;
      }
      stack.pop();
    }
  }
  
  return stack.isEmpty();
}

const test1 = '{[()]}'
const test2 = '{[(]}'
const test3 = '{()]}'
const test4 = '{[(]}'
const test5 = '{[()]}'
console.log(checkBalancedParentheses(test1))
console.log(checkBalancedParentheses(test2))
console.log(checkBalancedParentheses(test3))
console.log(checkBalancedParentheses(test4))
console.log(checkBalancedParentheses(test5))