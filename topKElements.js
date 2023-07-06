// Question 1: Write an efficient program for printing K largest elements in an array.Elements in an array can be in any order.
// Question 2: Given an integer array "nums" and an integer "k", return the "k" most frquent elements. You may return the answer in any order.

// Question 1:

// step 1 - Insert k number of elements into a min heap
// step 2 - add next elements from the input array one at a time
// step 3 - min-heapify, then, extract the min
// step 4 - min-heapify and repeat process from step 2 until we reach the end of the array.

const myArray = [9, 4, 3, 23, 57, 2, 6, 1]; // k = 3

//              9
//            /   \
//          4       3
//         / \     / \
//       23   57  2   6

//       /
//      1

let k = 2;

function swap(array, index1, index2) {
  [array[index1], array[index2]] = [array[index2], array[index1]];
}

function heapify(array, currentRootIndex, boundary) {
  let indexOfLowest = currentRootIndex;
  let leftChildIdx = indexOfLowest * 2 + 1;
  let rightChildIdx = indexOfLowest * 2 + 2;

  if (
    leftChildIdx < boundary &&
    array[leftChildIdx] < array[currentRootIndex]
  ) {
    indexOfLowest = leftChildIdx;
  }

  if (rightChildIdx < boundary && array[rightChildIdx] < array[indexOfLowest]) {
    indexOfLowest = rightChildIdx;
  }

  if (currentRootIndex !== indexOfLowest) {
    swap(array, currentRootIndex, indexOfLowest);

    heapify(array, indexOfLowest, boundary);
  }
}

function buildMinHeap(array, startIndex, boundary) {
  let currentRootIdx = Math.floor(boundary / 2 - 1);

  while (currentRootIdx >= startIndex) {
    heapify(array, currentRootIdx, boundary);
    currentRootIdx--;
  }
}

function topKElements(array, k) {
  let boundary = k;
  let startIndex = 0;

  while (boundary <= array.length) {
    buildMinHeap(array, startIndex, boundary);
    swap(array, startIndex + 1, boundary);
    ++startIndex;
    ++boundary;
  }
}

topKElements(myArray, k);
console.log(myArray);
