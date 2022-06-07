import React, { useEffect } from "react";
import "./Calculator.css";
import {
	buttonValues,
	buttonConstants,
	BLANK,
	operators,
} from "./calculatorConstants";
import {
	handleDigit,
	handleReset,
	handleFlip,
	handleDot,
	handleDelete,
	handleOperator,
	handleResult,
} from "./buttonHandlers";

const Calculator = ({
	result,
	equation,
	setEquation,
	setResult,
	setHistory,
}) => {
	// Used to update the history object
	useEffect(() => {
		if (result === BLANK) return;
		setHistory((prev) => {
			return [
				...prev,
				{
					equation: equation,
					result: result,
				},
			];
		});
	}, [result, equation, setHistory]);

	const renderButtons = (array) => {
		return array.map((e, i) => {
			let handleClick = "";
			const setters = { setEquation, setResult };
			// Assigning the right handleClicks
			if (/\d+/g.test(e)) handleClick = () => handleDigit(e, result, setters);
			else if (e === buttonConstants.CLEAR)
				handleClick = () => handleReset(setters);
			else if (e === buttonConstants.FLIP)
				handleClick = () => handleFlip(result, setters);
			else if (e === buttonConstants.DECIMAL)
				handleClick = () => handleDot(result, setters);
			else if (e === buttonConstants.DELETE)
				handleClick = () => handleDelete(result, setters);
			else if (operators.includes(e))
				handleClick = () => handleOperator(e, result, setters);
			else if (e === buttonConstants.EQUALS)
				handleClick = () => handleResult(equation, setters);
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
