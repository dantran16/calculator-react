import React, { useState } from "react";
import "./calculator.css";

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState('\u00A0');
  const [operator, setOperator] = useState('');
  
	// Helper Array to map out the buttons. Can be changed into an array of objects if needed!
	const buttonValues = [
		"AC",
		"+/-",
		"DEL",
		"/",
		7,
		8,
		9,
		"X",
		4,
		5,
		6,
		"-",
		1,
		2,
		3,
		"+",
		0,
		".",
		"=",
  ];
  
  
  const renderButtons = (array) => {
    // Handles the event for one digit buttons (depending on its value) and concatenates to the result
    const handleDigitClick = value => {
      setDisplay(prev => {
        return prev === '0' || prev === 'undefined' ? `${value}` : `${prev}${value}`
      });
    }

    // Handles the AC Button to clear all state
    const handleReset = () => {
      setDisplay('0');
      setHistory('\u00A0');
      setOperator("")
    }

    // Handles the +/- sign to flip the current operand
    const handleFlip = () => {
      setDisplay(prev => {
        if (prev.length === 1 && prev[0] === '0') return '0';
        return prev[0] === '-' ? prev.slice(1) : `-${prev}`;
      })
    }

    // Concatenates a decimal to the current operand
    const handleDot = () => {
      setDisplay(prev => {
        return prev.includes(".") ? prev : `${prev}.`
      })
    }

    // Handles the deletion of one character in the operand
    const handleDelete = () => {
      setDisplay(prev => prev.length > 1 ?
        prev[0] === '-' && prev.length === 2 ? '0':
        prev.slice(0, prev.length - 1) : '0');
    }

    // Handle the operator
    const handleOperator = (e) => {
      console.log(display)
      if (display.includes("undefined")) return;
      setOperator(e);
      setHistory(prev => {
        if (operator) return [...prev].slice(0, prev.length - 1).join("") + e;
        return `${display} ${e}`
      })
      setDisplay("0")
    }

    // Handles the calculations based on state
    const handleResult = (e) => {
      setDisplay(prev => {
        const equation = `${history} ${prev}`
        const [num1, num2] = equation.split(` ${operator} `).map(e => Number(e))
        if (operator === 'X') return `${num1 * num2}`;
        else if (operator === '/') return num2 === 0 ? "undefined" : `${num1 / num2}`;
        else if (operator === '-') return `${num1 - num2}`;
        else if (operator === '+') return `${num1 + num2}`;
        return prev;
      })
      setHistory('\u00A0');
      setOperator("")
    }

    return array.map((e, i) => {
      let handleClick = "";
      // Assigning the right handleClicks
      if (typeof e === 'number') handleClick = () => handleDigitClick(e);
      else if (e === "AC") handleClick = () => handleReset();
      else if (e === '+/-') handleClick = () => handleFlip();
      else if (e === '.') handleClick = () => handleDot();
      else if (e === 'DEL') handleClick = () => handleDelete();
      else if (e === '/') handleClick = () => handleOperator(e);
      else if (e === 'X') handleClick = () => handleOperator(e);
      else if (e === '-') handleClick = () => handleOperator(e);
      else if (e === '+') handleClick = () => handleOperator(e);
      else if (e === '=') handleClick = () => handleResult(e);
      else handleClick = () => console.log("Doesn't work!");

      return (
        <button key={i} value={e} onClick={() => handleClick()} className="calculator--keys--button">
          {e}
        </button>
      )
    })
  };

	return (
		<div className="container">
      <div className="calculator--display">
        <div className="calculator--display--prev">
          {history}
        </div>
        <div className="calculator--display--current">
        {display}
        </div>
      </div>
			<div className="calculator--keys">{renderButtons(buttonValues)}</div>
		</div>
	);
};

export default Calculator;
