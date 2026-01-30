// calculate x**n % m  x**n can be very big
// (a * b) % m = {(a % m) * (b % m)} % m
// x**n % m = {(x**n/2 % m) * (x**n/2 % m)} % m (n is even)
//          = {(x % m) * (x**n-1 % m)} % m (n is odd)
//          = 1 (n = 0)
// time complexity - O(logn)

function modularExponentiation(x: number, n: number, m: number): number {
  if(n === 0) return 1;
  if(n % 2 === 0) {
    let temp = modularExponentiation(x, n / 2, m);
    return (temp * temp) % m;
  }
  return ((x % m) * modularExponentiation(x, n - 1, m)) % m
  
}