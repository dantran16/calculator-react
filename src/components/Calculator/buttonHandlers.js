import { buttonConstants, operators, BLANK } from "./CalculatorConstants";

// Handles the event for one digit buttons (depending on its number) and concatenates to the result
export function handleDigit(number, result, { setEquation, setResult }) {
	// If there's a result, we should reset it
	if (result !== BLANK) {
		handleReset({ setEquation, setResult });
	}
	// Case 1: If it's 0, replace the 0 with a number (0-9)
	// Case 2: If it's a number that's not 0, append to it
	// Case 3: If there's an operator at the end, add a space and append the number
	setEquation((prev) => {
		if (operators.includes(prev[prev.length - 1])) return `${prev} ${number}`;
		return prev === buttonConstants.ZERO ? `${number}` : `${prev}${number}`;
	});
}

// Handles the AC button where it clears all state
export function handleReset({ setEquation, setResult }) {
	setEquation(buttonConstants.ZERO);
	setResult(BLANK);
}

// Handles flipping one number to be either positive or negative
export function handleFlip(result, { setEquation, setResult }) {
	if (result !== BLANK) {
		setEquation(result);
		setResult(BLANK);
	}
	// If the last element is an operand/number, flip it negative or positive
	setEquation((prev) => {
		const equationArray = prev.split(" ");
		const lastIndex = equationArray.length - 1;
		if (/\d+/g.test(equationArray[lastIndex])) {
			if (equationArray[lastIndex].includes("-")) {
				equationArray[lastIndex] = equationArray[lastIndex].slice(1);
			} else {
				equationArray[lastIndex] = `-${equationArray[lastIndex]}`;
			}
		}
		return equationArray.join(" ");
	});
}

// Handles the button where we can add decimals to a number
export function handleDot(result, { setEquation, setResult }) {
	if (result !== BLANK) {
		handleReset({ setResult, setEquation });
	}
	// Case 1: If the last element is an operator, add a 0.
	// Case 2: If the last element is a number amd has a dot, do not add a dot anymore
	// Case 3: If the last element is a number and has no dot, add a dot at the end
	setEquation((prev) => {
		const array = prev.split(" ");
		if (operators.includes(array[array.length - 1])) array.push("0");
		array[array.length - 1] = array[array.length - 1].includes(".")
			? array[array.length - 1]
			: `${array[array.length - 1]}.`;
		return array.join(" ");
	});
}

// Handles the button where we can delete one character from the equation
export function handleDelete(result, { setEquation, setResult }) {
	// Delete the result if there's a result
	if (result !== BLANK) {
		setResult(BLANK);
	}
	// Delete the last element of the equation
	// Edge Case 1: If the equation is only 0 or is one number, replace it with 0
	// Edge Case 2: If the last part is an operator, remove it
	setEquation((prev) => {
		const equationArray = prev.split(" ");
		let lastIndex = equationArray.length - 1;
		let lastElement = equationArray[lastIndex];
		if (equationArray.length === 1) {
			if (equationArray[lastIndex].length < 2) {
				equationArray[lastIndex] = buttonConstants.ZERO;
			} else {
				equationArray[lastIndex] = lastElement.slice(0, lastIndex - 1);
			}
		} else if (equationArray.length > 1) {
			if (operators.includes(lastElement)) equationArray.pop();
			else {
				equationArray[lastIndex] = equationArray[lastIndex].slice(
					0,
					equationArray[lastIndex].length - 1
				);
				if (equationArray[lastIndex] === "") equationArray.pop();
			}
		}
		return equationArray.join(" ");
	});
}

// Handles appending an operator to the equation
export function handleOperator(operator, result, { setEquation, setResult }) {
	// Edge case: If the result is already found, replace the equation with the result and then add the operator
	if (result !== BLANK) {
		setEquation(result);
		setResult(BLANK);
	}
	setEquation((prev) => {
		const equationArray = prev.split(" ");
		const lastIndex = equationArray.length - 1;
		const lastElement = equationArray[lastIndex];
		if (lastElement[lastElement.length - 1] === buttonConstants.DECIMAL)
			equationArray[lastIndex] = `${lastElement}0`;
		if (operators.includes(lastElement)) equationArray[lastIndex] = operator;
		else equationArray.push(operator);
		return `${equationArray.join(" ")}`;
	});
}

// Handles the button to solve the calculation of the equation
export function handleResult(equation, { setResult, setEquation }) {
	// If the equation ends with an operator, do not do anything
	if (operators.includes(equation[equation.length - 1])) return;
	setResult(() => {
		const equationArray = equation.split(" ");
		const stack = [];

		// Precedence 1: Multiply and Divide
		for (let i = 0; i < equationArray.length; i++) {
			if (equationArray[i] === buttonConstants.MULTIPLY) {
				const firstNum = Number(stack.pop());
				i++;
				const secondNum = Number(equationArray[i]);
				stack.push(firstNum * secondNum);
			} else if (equationArray[i] === buttonConstants.DIVIDE) {
				const firstNum = Number(stack.pop());
				i++;
				const secondNum = Number(equationArray[i]);
				stack.push(firstNum / secondNum);
			} else {
				stack.push(equationArray[i]);
			}
		}
		// Edge case: If we already did all the operations (so no addition/subtraction), we just return the stack already
		if (stack.length === 1) return stack[0].toString();

		// Next Precedence: Addition and multiplication
		while (stack.length > 1) {
			const secondNum = Number(stack.pop());
			const operand = stack.pop();
			const firstNum = Number(stack.pop());
			if (operand === buttonConstants.PLUS) {
				stack.push(firstNum + secondNum);
			} else if (operand === buttonConstants.SUBTRACT) {
				stack.push(firstNum - secondNum);
			}
		}
		return stack[0].toString();
	});
}

export function handleHistoryClear(setHistory) {
	setHistory([]);
}

export function handleJumpBack(
	index,
	history,
	{ setEquation, setResult, setHistory }
) {
	setEquation(history[index].equation);
	setResult(history[index].result);
	setHistory((prev) => prev.slice(0, index));
}
