// fib recursion time complexity - O(2**n)
// fib recursion with memoization time complexity - O(n)

function fibonacci(n: number, memo: number[] = []): number {
  if(n <= 1) return n;
  if(memo[n] !== undefined) return memo[n];
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}

console.log(fibonacci(100))