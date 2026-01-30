// fib sequence = first two are 0, 1 and the other are the sum of two num before it
// fib recursion time complexity - O(2**n)
// fib recursion with memoization time complexity - O(n)
// fib recursion space complexity(max depth of recursion tree) - O(n) 

function fibonacci(n: number, memo: number[] = []): number {
  if(n <= 1) return n;
  if(memo[n] !== undefined) return memo[n];
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}

console.log(fibonacci(100));