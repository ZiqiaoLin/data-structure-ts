// x**n -> x * x**n-1
// time complexity - O(logn)

function pow(x: number, n: number): number {
  if(n === 0) return 1;
  if(n % 2 === 0) {
    let temp = pow(x, n / 2);
    return temp * temp;
  }
  return x * pow(x, n - 1);
}

console.log(pow(2, 4))