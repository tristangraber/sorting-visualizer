/*
    Sorting Algorithm Visualizer JS file for STEM EE 2nd-Year Capstone project
    Names: Tristan Graber and Ethan Wert
    Date: 4/21/21   
*/

/*
   Returns an array of animations for the Bubble Sort algorithm.
*/
export function getBubbleSortAnimations(array) {
    const animations = [];
    if (array.length === 1) return array;

    let size = array.length;
    // # of sorting runs through the array
    for (let i = 0; i < size - 1; i++) {
        // a single sorting run through the array
        // (size - i - 1) because each run solidifies the new max
        for (let j = 0; j < size - i - 1; j++) {
            animations.push(j);
            animations.push(j);
            // swap if first is greater than the second
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
    return animations;
}

/*
    Returns an array of animations for the Selection Sort algorithm.
*/
export function getSelectionSortAnimations(array) {
    const animations = [];
    if (array.length === 1) return array;

    let size = array.length;
    // # of sorting runs through the array
    for (let i = 0; i < size - 1; i++) {
        let min = i;
        // a single sorting run through the array
        for (let j = 1 + i; j < size; j++) {
            animations.push(i);
            animations.push(j);
            animations.push(i);
            animations.push(j);
            // find min
            if (array[j] < array[min]) {
                min = j;
            }
        }
        // swap min for start index
        let temp = array[i];
        array[i] = array[min];
        array[min] = temp;
    }
    return animations;
}