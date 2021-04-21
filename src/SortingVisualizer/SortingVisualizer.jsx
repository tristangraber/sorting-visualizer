/*
    Sorting Algorithm Visualizer JSX file for STEM EE 2nd-Year Capstone project
    Names: Tristan Graber and Ethan Wert
    Date: 4/21/21
*/

import React from 'react';
import {getBubbleSortAnimations} from '../SortingAlgorithms/SortingAlgorithms.js';
import {getSelectionSortAnimations} from '../SortingAlgorithms/SortingAlgorithms.js';
import {randomInt} from '../SortingAlgorithms/HelperFunctions.js';
import {findElementIdx} from '../SortingAlgorithms/HelperFunctions.js';
import './SortingVisualizer.css';

const PRIMARY_COLOR = 'lightblue';
const SECONDARY_COLOR = 'orange';
const FINAL_COLOR = 'lightgreen';
const ANIMATION_SPEED = 1;
const ARRAY_SIZE = 100;

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = { array: [] };
    }

    /*
        Runs at the start to generate a new random array for display.
    */
    componentDidMount() {
        this.generateNewArray();
    }

    /*
        Generates a new random array for display.
    */
    generateNewArray() {
        const array = [];
        for (let i = 0; i < ARRAY_SIZE; i++) {
            array.push(randomInt(5,520));
        }
        this.setState({array});
        this.resetColor();
    }

    /*
        Resets all bars color to primary color.
    */
    resetColor() {
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < arrayBars.length; i++) {
            arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
        }
    }

    /*
        Runs the Bubble Sort sorting algorithm on the current array.

        DOCUMENTATION:
         - animations array will have 2 indicies for each step of the animation
            - EX: animations = [0,0,1,1,2,2...]
            - the first of the pair is to change color from primary to secondary
            - the second of the pair is to change from secondary back to primary or final
    */
    bubbleSort() {
        // get array of animations for bubble sort
        const animations = getBubbleSortAnimations(this.state.array);
        // gets array of all the array-bar objects that are currently in the DOM
        const arrayBars = document.getElementsByClassName('array-bar');
        // loop for each value of the animation (pt 1: primary to secondary, pt 2: secondary to other)
        for (let i = 0; i < animations.length; i++) {
            // get first bar and next bar
            const barOneIdx = animations[i];
            const barTwoIdx = animations[i] + 1;
            // create variables to change height
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            let color = PRIMARY_COLOR;
            // delays the action so it doesn't happen instantly
            setTimeout(() => {
                // if it is a primary to secondary color change
                if (i % 2 === 0) {
                    color = SECONDARY_COLOR;
                    // screate variables to store height
                    let barOneHeight = barOneStyle.height;
                    let barTwoHeight = barTwoStyle.height;
                    // swap if the height of first is greater than second
                    if (parseInt(barOneHeight, 10) > parseInt(barTwoHeight, 10)) {
                        barOneStyle.height = barTwoHeight;
                        barTwoStyle.height = barOneHeight;
                    }
                }
                // set the colors (secondary if first part of ani, primary if second part of ani)
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
                // if it is at the end, change to final color
                if (animations[i] > animations[i + 1]) {
                    arrayBars[animations[i] + 1].style.backgroundColor = FINAL_COLOR;
                }
                // color first two bars green when finished
                if (animations.length - i < 3) {
                    arrayBars[animations[i] - 1].style.height = this.state.array[animations[i] - 1] + 'px';
                    arrayBars[animations[i]].style.height = this.state.array[animations[i]] + 'px';
                    arrayBars[animations[i] + 1].style.height = this.state.array[animations[i] + 1] + 'px';

                    arrayBars[animations[i] - 1].style.backgroundColor = FINAL_COLOR;
                    arrayBars[animations[i]].style.backgroundColor = FINAL_COLOR;
                    arrayBars[animations[i] + 1].style.backgroundColor = FINAL_COLOR;
                }
            }, i * ANIMATION_SPEED);
        }
    }

    /*
        Runs the Selection Sort sorting algorithm on the current array.

        DOCUMENTATION:
         - animations array will have 4 indicies for each step of the animation
            - EX: animations = [0,1,0,1,0,2,0,2...]
            - i = 0 is the first bar to compare and i + 1 is the next bar to compare
            - the first pair (i, i + 1) is to change color from primary to secondary
            - the second pair (i + 2, i + 3) is to change color back to primary
    */
    selectionSort() {
        // get array of animations for selection sort
        const animations = getSelectionSortAnimations(this.state.array);
        // loop for each value of the animation (pt 1: primary to secondary, pt 2: secondary to other)
        for (let i = 0; i < animations.length; i = i + 2) {
            // gets array of all the array-bar objects that are currently in the DOM
            const arrayBars = document.getElementsByClassName('array-bar');
            // get first bar and next bar
            const barOneIdx = animations[i];
            const barTwoIdx = animations[i + 1];
            // create variables to change height
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            let color = PRIMARY_COLOR;
            // delays the action so it doesn't happen instantly
            setTimeout(() => {
                // if it is a primary to secondary color change
                if (i % 4 === 0) {
                    color = SECONDARY_COLOR;
                    barOneStyle.backgroundColor = color;
                }
                // set the colors (secondary if first part of ani, primary if second part of ani)
                barTwoStyle.backgroundColor = color;
                // if it is at the end, change to final color
                if (animations[i + 1] > animations[i + 3]) {
                    // find the index of the next sorted element
                    let idx = findElementIdx(this.state.array[barOneIdx], arrayBars);
                    // determine heights
                    let minBarStyle = arrayBars[idx].style;
                    let minBarHeight = minBarStyle.height;
                    let swapBarHeight = barOneStyle.height;
                    // swap heights and change color to final color
                    barOneStyle.height = minBarHeight;
                    minBarStyle.height = swapBarHeight;
                    arrayBars[barOneIdx].style.backgroundColor = FINAL_COLOR;
                }
                // when finished
                if (animations.length - i < 3) {
                    // assign correct heights to last 3
                    arrayBars[animations[i] - 1].style.height = this.state.array[animations[i] - 1] + 'px';
                    arrayBars[animations[i]].style.height = this.state.array[animations[i]] + 'px';
                    arrayBars[animations[i] + 1].style.height = this.state.array[animations[i] + 1] + 'px';
                    // assign correct colors to last 3
                    arrayBars[animations[i] - 1].style.backgroundColor = FINAL_COLOR;
                    arrayBars[animations[i]].style.backgroundColor = FINAL_COLOR;
                    arrayBars[animations[i] + 1].style.backgroundColor = FINAL_COLOR;
                }
            }, i * ANIMATION_SPEED);
        }
    }

    /*
        Render using ReactJS.
    */
    render() {
        const {array} = this.state;
        return (
          <div className="array-container">
              <h1>Sorting Algorithm Visualizer</h1>
              <h2>by Tristan Graber and Ethan Wert</h2>
            {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{backgroundColor: PRIMARY_COLOR, height: `${value}px`,
            }}></div>
        ))}
            <button className="button" onClick={() => this.generateNewArray()}>Generate New Array</button>
            <button className="button" onClick={() => this.bubbleSort()}>Bubble Sort</button>
            <button className="button" onClick={() => this.selectionSort()}>Selection Sort</button>
          </div>
        );
      }
    }
