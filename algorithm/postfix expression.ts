import { LinkedListStack } from "../linked-list-stack.js";

function tokenize(exp: string): string[] {
  // \d+(\.\d+)? match number include float
  // \*\*|[+\-*/%()] match operator and parentheses
  const tokens: string[] = [];
  const regex = /(\d+(\.\d+)?|\*\*|[+\-*/%()])/g;
  // remove all space
  exp = exp.replace(/\s+/g, '');
  const rawTokens = exp.match(regex) || [];
  for(let i = 0; i < rawTokens.length; i++) {
    const curr = rawTokens[i]!;
    if(curr === '-') {
      const prev = tokens[tokens.length - 1]
      // check nagetive sign or minus sign
      const isNegativeSign = tokens.length === 0 || 
      prev !== undefined && ['(', '+', '-', '/', '%', '*', '**'].includes(prev);
      if(isNegativeSign && i + 1 < rawTokens.length) {
        tokens.push('-' + rawTokens[++i]);
        continue
      } 
    }
    tokens.push(curr);
  }
  return tokens;
}

function isOperand(s: string): boolean { 
  const operators = ['+', '-', '/', '%', '*', '**', ')', '('];
  return !operators.includes(s);
}

function isOperator(s: string): boolean {
  const operators = ['+', '-', '/', '%', '*', '**'];
  return operators.includes(s);
}

function isOpeningParentheses(s: string): boolean {
  return s === '(';
}

const ops: Record<string, {prec: number, assoc: 'L' | 'R'}> = {
  '+': { prec: 2, assoc: 'L' },
  '-': { prec: 2, assoc: 'L' },
  '*': { prec: 3, assoc: 'L' },
  '/': { prec: 3, assoc: 'L' },
  '%': { prec: 3, assoc: 'L' },
  '**': { prec: 4, assoc: 'R' }
};

function shouldPop(s1: string, s2: string): boolean {
  // s2: stack top
  if(isOpeningParentheses(s2)) return false;

  const p1 = ops[s1]!.prec; //curr
  const p2 = ops[s2]!.prec; //top
  const a1 = ops[s1]!.assoc;

  return a1 === 'L' ? p1 <= p2 : p1 < p2;
}

function infixToPostfix(exp: string): string {
  const expression = tokenize(exp);
  if(expression.length === 0) return '';
  const stack = new LinkedListStack<string>();
  let res: string = '';
  for(let i = 0; i < expression.length; i++) {
    if(isOperand(expression[i]!)) {
      // if it's operand, put it in the postfix expression
      res += expression[i] + ' ';
    } else if(isOperator(expression[i]!)) {
      // if it's operator, check the top of stack, if it's [+ - * / %], higher or equal precedance operator in the stack will pop to postfix exp;
      //                                           if it's [**] only higher precedance will pop.
      // stop when top stack is '('.
      while(!stack.isEmpty() && shouldPop(expression[i]!, stack.top()!)) {
        res += stack.pop() + ' ';
      }
      stack.push(expression[i]!);
    } else if(isOpeningParentheses(expression[i]!)) {
      // if it's a opening parentheses, push it to stack
      stack.push(expression[i]!);
    } else if(expression[i] === ')') {
      // if it's a closing parentheses, pop all operator until a opening parentheses.
      while(!stack.isEmpty() && !isOpeningParentheses(stack.top()!)) {
        res += stack.pop() + ' ';
      }
      stack.pop(); // pop '('
    }
  }
  while(!stack.isEmpty()) {
  // pop all operator until stack empty.
    res += stack.pop() + ' ';
  }
  return res;
}

function calculatePostfix(str: string): number | null{
  if(str.length === 0) return null;
  const stack = new LinkedListStack<number>();
  const postfix = infixToPostfix(str).trim().split(' ');
  for(let i = 0; i < postfix.length; i++) {
    if(isOperand(postfix[i]!)) {
      // if it's operand, push to stack
      stack.push(Number(postfix[i]));
    } else {
      // if it's operator, pop two operands from stack top, first pop is the second operand, calculate and push result to stack
      const n1 = Number(stack.pop());
      const n2 = Number(stack.pop());
      if(n1 === null || n2 === null) {
        console.error('error: not enough operand');
        return null;
      }
      let res: number;
      switch(postfix[i]) {
        case '+': res = n2 + n1; break;
        case '-': res = n2 - n1; break;
        case '*': res = n2 * n1; break;
        case '/': res = n2 / n1; break;
        case '%': res = n2 % n1; break;
        case '**': res = n2 ** n1; break;
        default: return null;
      }
      stack.push(res);
    }
  }
  const res = stack.pop();
  if(!stack.isEmpty()) {
    console.error('error: too much operand');
    return null;
  }
  return res;
}

const exp1 = '3 + 4 * 2 / 1'; //3 4 2 * 1 / +  '11'
const exp2 = '((1 + 2) * 3) / (4 + 5)'; //1 2 + 3 * 4 5 + / '1'
const exp3 = '3 + 2 ** 2 ** 3'; //3 2 2 3 ** ** + '259'
const exp4 = '5 + (-3 + 2) * 4'; //5 -3 2 + 4 * + '1'
const exp5 = '100 / (2 + 3) ** 2 * 3'; //100 2 3 + 2 ** / 3 * '12'
const exp6 = '32 ** 1 ** 5 + 3 ** 2'; //32 1 5 ** ** 3 2 ** + '41'

console.log(calculatePostfix(exp1));
console.log(calculatePostfix(exp2));
console.log(calculatePostfix(exp3));
console.log(calculatePostfix(exp4));
console.log(calculatePostfix(exp5));
console.log(calculatePostfix(exp6));