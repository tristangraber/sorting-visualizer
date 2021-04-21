/*
    Sorting Algorithm Visualizer JS file for STEM EE 2nd-Year Capstone project
    Names: Tristan Graber and Ethan Wert
    Date: 4/21/21
*/

/*
    Generates a new random integeer between a given max and min.
*/
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/*
    Determines if two given arrays are equal.
*/
export function arraysAreEqual(array1, array2) {
    if (array1.length !== array2.length) return false;
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) return false;
    }
    return true;
}

/*
     Finds a given element in a given array.
*/
export function findElementIdx(element, array) {
    let result = -1;
    for (let i = 0; i < array.length; i++) {
        if (array[i].style.height === element + 'px') {
            result = i;
        }
    }
    return result;
}
