// bubble sort
// time complexity - O(n**)

function bubbleSort(array: number[]): number[] {
  for(let i = 0; i < array.length - 1; i++) {
    let swapped = false;
    for(let j = 0; j < array.length - i - 1; j++) {
      if(array[j]! > array[j + 1]!) {
        let temp = array[j];
        array[j] = array[j + 1]!;
        array[j + 1] = temp!;
        swapped = true;
      }
    }
    if(!swapped) break;
  }
  return array;
}
console.log(bubbleSort([5,3,6,4,3,4,7,2,9,2,9,-2]))
