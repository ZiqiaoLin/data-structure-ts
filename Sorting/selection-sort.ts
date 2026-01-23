// selection sort
// time complexity - O(n**)

function selectionSort(array: number[]): number[] {
  for(let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    for(let j = i + 1; j < array.length; j++) {
      if(array[j]! < array[minIndex]!) minIndex = j;
    }
    if(minIndex !== i) {
      let temp = array[i];
      array[i] = array[minIndex]!;
      array[minIndex] = temp!;
    }
  }
  return array;
}

console.log(selectionSort([5,3,6,9,2,9,-2]))

