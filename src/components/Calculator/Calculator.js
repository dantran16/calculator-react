import React, { useState } from "react";
import "./calculator.css";

const Calculator = () => {
	const [result, setResult] = useState("\u00A0");
	const [equation, setEquation] = useState("0");

	// Helper Array to map out the buttons. Can be changed into an array of objects if needed!
	const buttonValues = [
		"AC",
		"+/-",
		"DEL",
		"/",
		7,
		8,
		9,
		"*",
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
		const handleDigit = (value) => {
			setEquation((prev) => {
				return prev === "0" ? `${value}` : `${prev}${value}`;
			});
		};

		// Handles the AC Button to clear all state
		const handleReset = () => {
			setResult("\u00A0");
			setEquation("0");
		};

		// Handles the +/- sign to flip the current operand
    const handleFlip = () => {
      setEquation((prev) => {
        return prev;
      })
    };

		// Concatenates a decimal to the current operand
		const handleDot = () => {
			setEquation((prev) => {
				const array = prev.split(" ");
        if(array.length > 1 && "+-*/".includes(array[array.length - 2])) array[array.length - 1] = "0"
				array[array.length - 1] = array[array.length - 1].includes(".")
					? array[array.length - 1]
					: `${array[array.length - 1]}.`;
				return array.join(" ");
			});
		};

		// Handles the deletion of one character in the operand
		const handleDelete = () => {
			setEquation((prev) => {
				if (prev === "0" || prev.length < 2) return "0";
				if ("+-*/".includes(prev[prev.length - 2])) {
					return prev.slice(0, prev.length - 3);
				}
				return prev.slice(0, prev.length - 1);
			});
		};

		// Handle the operator
		const handleOperator = (e) => {
      setEquation((prev) => {
        if(prev[prev.length - 1] === ".") return `${prev}0 ${e} `
				if ("+-*/".includes(prev[prev.length - 2]))
					return (
						prev.slice(0, prev.lastIndexOf(prev[prev.length - 2])) +
						e +
						prev.slice(prev.lastIndexOf(prev[prev.length - 1]))
					);
				return `${prev} ${e} `;
			});
		};

		// Handles the calculations
		const handleResult = () => {};

		return array.map((e, i) => {
			let handleClick = "";
			// Assigning the right handleClicks
			if (typeof e === "number") handleClick = () => handleDigit(e);
			else if (e === "AC") handleClick = () => handleReset();
			else if (e === "+/-") handleClick = () => handleFlip();
			else if (e === ".") handleClick = () => handleDot();
			else if (e === "DEL") handleClick = () => handleDelete();
			else if (e === "/") handleClick = () => handleOperator(e);
			else if (e === "*") handleClick = () => handleOperator(e);
			else if (e === "-") handleClick = () => handleOperator(e);
			else if (e === "+") handleClick = () => handleOperator(e);
			else if (e === "=") handleClick = () => handleResult();
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
