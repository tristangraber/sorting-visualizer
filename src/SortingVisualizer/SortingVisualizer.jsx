/*
Sorting Algorithm Visualizer JSX file for STEM EE 2nd-Year Capstone project
Names: Tristan Graber and Ethan Wert
Date: 4/21/21
*/

import React from 'react';
import './SortingVisualizer.css';

const PRIMARY_COLOR = 'lightblue';
const SECONDARY_COLOR = 'orange';
const FINAL_COLOR = 'lightgreen';
const ANIMATION_SPEED = 2;

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = { array: [] };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < 100; i++) {
            array.push(randomInt(5,520));
        }
        this.setState({array});
        this.resetColor();
    }

    resetColor() {
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < arrayBars.length; i++) {
            arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
        }
    }

    insertionSort() {}

    bubbleSort() {
        const animations = testSort(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < animations.length; i++) {
            const barOneIdx = animations[i];
            const barTwoIdx = animations[i] + 1;
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            let color = PRIMARY_COLOR;
            setTimeout(() => {
                if (i % 2 === 0) {
                    color = SECONDARY_COLOR;
                    let barOneHeight = barOneStyle.height;
                    let barTwoHeight = barTwoStyle.height;
                    if (parseInt(barOneHeight, 10) > parseInt(barTwoHeight,10)) {    
                        barOneStyle.height = barTwoHeight;
                        barTwoStyle.height = barOneHeight;
                    }
                }
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
                if (animations[i] > animations[i+1]) {
                    arrayBars[animations[i] + 1].style.backgroundColor = FINAL_COLOR;
                }
                if (animations.length - i < 3) { /* to color in last two bars */
                    arrayBars[animations[i]].style.backgroundColor = FINAL_COLOR;
                    arrayBars[animations[i] + 1].style.backgroundColor = FINAL_COLOR;
                }
            }, i * ANIMATION_SPEED);
        }
    }

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
            <button className="button" onClick={() => this.resetArray()}>Generate New Array</button>
            <button className="button" onClick={() => this.insertionSort()}>Insertion Sort</button>
            <button className="button" onClick={() => this.bubbleSort()}>Bubble Sort</button>
          </div>
        );
      }
    }

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function arraysAreEqual(array1, array2) {
        if (array1.length !== array2.length) return false;
        for (let i = 0; i < array1.length; i++) {
            if (array1[i] !== array2[i]) return false;
        }
        return true;
    }

    function testSort(array){
        const animations = [];
        if (array.length === 1) return array;
    
        let size = array.length;
        for (let i = 0; i < size - 1; i++) {
            for (let j = 0; j < size-i-1; j++) {
                animations.push(j);
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

