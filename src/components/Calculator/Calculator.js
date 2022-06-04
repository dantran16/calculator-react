import React, { useEffect, useState } from "react";
import "./Calculator.css";
import { buttonValues, buttonConstants, BLANK, operators } from "./CalculatorConstants";
import { handleDigit, handleReset, handleFlip, handleDot, handleDelete, handleOperator, handleResult } from "./buttonHandlers";

const Calculator = () => {
	const [result, setResult] = useState(BLANK);
	const [equation, setEquation] = useState(buttonConstants.ZERO);
  const [solved, setSolved] = useState(false);
  const [history, setHistory] = useState([])

  // Used to keep track of result
	useEffect(() => {
    console.log(history)
	} , [result, history]);

	const renderButtons = (array) => {
		return array.map((e, i) => {
			let handleClick = "";
			// Assigning the right handleClicks
			if (/\d+/g.test(e)) handleClick = () => handleDigit(e, solved, setEquation, setResult, setSolved);
			else if (e === buttonConstants.CLEAR) handleClick = () => handleReset(setResult, setEquation, setSolved);
			else if (e === buttonConstants.FLIP) handleClick = () => handleFlip(setEquation, setResult, setSolved, solved, result);
			else if (e === buttonConstants.DECIMAL) handleClick = () => handleDot(solved, setResult, setEquation, setSolved);
			else if (e === buttonConstants.DELETE) handleClick = () => handleDelete(solved, setResult, setSolved, setEquation);
			else if (operators.includes(e)) handleClick = () => handleOperator(e, solved, setEquation, result, setResult, setSolved);
			else if (e === buttonConstants.EQUALS) handleClick = () => handleResult(equation, result, setResult, solved, setSolved, setHistory);
			else handleClick = () => console.log("Doesn't work!");

			return (
				<button
					key={i}
					value={e}
					onClick={() => handleClick()}
					className="calculator--keys--button"
				>
					{e}
				</button>
			);
		});
	};

	return (
		<div className="container">
			<div className="calculator--display">
				<div className="calculator--display--equation">{equation}</div>
				<div className="calculator--display--result">{result}</div>
			</div>
			<div className="calculator--keys">{renderButtons(buttonValues)}</div>
		</div>
	);
};

export default Calculator;
