const arr = [{id: 'one'}, {id: 'two'}, {id: 'three'}, {id: 'four'}];
const sortedIndex = arr.findIndex(e => e.id === 'three');




const newarr = arr.splice(sortedIndex, 1);

console.log([arr, newarr[0]]);

arr.splice(sortedIndex+1, 0, newarr[0]);
arr.splice(sortedIndex-1, 0, newarr[0]);
console.log({arr});



