// Insertion sort
// time complexity - O(n**)
function insertionSort(array: number[]): number[] {
  for(let i = 1; i < array.length; i++) {
    let value = array[i];
    let hole = i;
    while(hole > 0 && array[hole - 1]! > value!) {
      array[hole] = array[hole - 1]!;
      hole--;
    }
    array[hole] = value!;
  }
  return array;
}

console.log(insertionSort([5,3,6,4,3,4,7,2,9,2,9,-2]))
