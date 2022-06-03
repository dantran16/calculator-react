import React, { useEffect, useState } from "react";
import "./calculator.css";

const Calculator = () => {
	const [result, setResult] = useState("\u00A0");
	const [equation, setEquation] = useState("0");
  const [solved, setSolved] = useState(false);
  const [history, setHistory] = useState([])

  // Used to keep track of result
	useEffect(() => {
    console.log(history)
	} , [result]);

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
      if (solved) {
        handleReset()
      }
			setEquation((prev) => {
				if ("+-*/".includes(prev[prev.length - 1])) return `${prev} ${value}`;
				return prev === "0" ? `${value}` : `${prev}${value}`;
			});
		};

		// Handles the AC Button to clear all state
		const handleReset = () => {
			setResult("\u00A0");
			setEquation("0");
			setSolved(false);
		};

		// Handles the +/- sign to flip the current operand
		const handleFlip = () => {
			if (solved) {
				setEquation(result);
				setResult("\u00A0");
				setSolved(false);
			}
			setEquation((prev) => {
				const equationArray = prev.split(" ");
				const lastIndex = equationArray.length - 1;
				if (/\d+/g.test(equationArray[lastIndex])) {
					console.log();
					if (equationArray[lastIndex].includes("-")) {
						equationArray[lastIndex] = equationArray[lastIndex].slice(1);
					} else {
						equationArray[lastIndex] = `-${equationArray[lastIndex]}`;
					}
				}

				return equationArray.join(" ");
			});
		};

		// Concatenates a decimal to the current operand
    const handleDot = () => {
      if (solved) {
        handleReset()
      }
			setEquation((prev) => {
				const array = prev.split(" ");
				if (array.length === 1 && "+-*/".includes(array[array.length - 2]))
					array[array.length - 1] = "0";
				array[array.length - 1] = array[array.length - 1].includes(".")
					? array[array.length - 1]
					: `${array[array.length - 1]}.`;
				return array.join(" ");
			});
		};

		// Handles the deletion of one character in the operand
		const handleDelete = () => {
			if (solved) {
				handleReset();
				return;
			}
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
			if (solved) {
        setEquation(result);
        setResult("\u00A0")
				setSolved(false);
			}
			setEquation((prev) => {
				const equationStack = prev.split(" ");
				const lastIndex = equationStack.length - 1;
				const lastElement = equationStack[lastIndex];
				console.log(equationStack);
				if (lastElement[lastElement.length - 1] === ".")
					equationStack[lastIndex] = `${lastElement}0`;
				if ("+-*/".includes(lastElement)) equationStack[lastIndex] = e;
				else equationStack.push(e);
				return `${equationStack.join(" ")}`;
			});
		};

		// Handles the calculations
		const handleResult = () => {
			if ("+-*/".includes(equation[equation.length - 1])) return;
			setResult(() => {
				const equationArray = equation.split(" ");
				const stack = [];
				for (let i = 0; i < equationArray.length; i++) {
					if (equationArray[i] === "*") {
						const firstNum = Number(stack.pop());
						i++;
						const secondNum = Number(equationArray[i]);
						stack.push(firstNum * secondNum);
					} else if (equationArray[i] === "/") {
						const firstNum = Number(stack.pop());
						i++;
						const secondNum = Number(equationArray[i]);
						stack.push(firstNum / secondNum);
					} else {
						stack.push(equationArray[i]);
					}
				}
				if (stack.length === 1) return stack[0].toString();
				while (stack.length > 1) {
					const secondNum = Number(stack.pop());
					const operand = stack.pop();
					const firstNum = Number(stack.pop());
					if (operand === "+") {
						stack.push(firstNum + secondNum);
					} else if (operand === "-") {
						stack.push(firstNum - secondNum);
					}
				}
				return stack[0].toString();
			});
      setSolved(true);
      setHistory(prev => {
        return [
          ...prev,
          {
            equation: equation,
            result: result
          }
        ]
      });
		};

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
