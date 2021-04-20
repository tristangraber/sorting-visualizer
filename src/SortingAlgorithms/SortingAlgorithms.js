/*
Sorting Algorithm Visualizer JS file for STEM EE 2nd-Year Capstone project
Names: Tristan Graber and Ethan Wert
Date: 4/21/21
*/

function bubbleSort(array){
    const animations = [];
    if (array.length == 1) return array;

    let size = array.length;
    for (let i = 0; i < size - 1; i++) {
        for (let j = 0; j < size-i-1; j++) {
            animations.push(j);
            if(array[j] > array[j+1]) {
                let temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
            }
        }
    }
    return animations;
};