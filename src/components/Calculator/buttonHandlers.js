import { buttonConstants, operators, BLANK } from "./CalculatorConstants";

// Handles the event for one digit buttons (depending on its value) and concatenates to the result
export function handleDigit(value, solved, setEquation, setResult, setSolved) {
  if (solved) {
    handleReset(setResult, setEquation, setSolved);
  }
  setEquation((prev) => {
    if (operators.includes(prev[prev.length - 1]))
      return `${prev} ${value}`;
    return prev === buttonConstants.ZERO ? `${value}` : `${prev}${value}`;
  });
}

// Handles the AC button where it clears all the state except for history
export function handleReset(setResult, setEquation, setSolved) {
  setResult(BLANK)
  setEquation(buttonConstants.ZERO)
  setSolved(false)
}

// Handles flipping one number to be either positive or negative
export function handleFlip(setEquation, setResult, setSolved, solved, result) {
  if (solved) {
    setEquation(result);
    setResult(BLANK);
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
}

// Handles the button where we can add decimals to a number
export function handleDot(solved, setResult, setEquation, setSolved) {
  if (solved) {
    handleReset(setResult, setEquation, setSolved)
  }
  setEquation((prev) => {
    const array = prev.split(" ");
    if (array.length === 1 && operators.includes(array[array.length - 2]))
      array[array.length - 1] = buttonConstants.ZERO;
    array[array.length - 1] = array[array.length - 1].includes(".")
      ? array[array.length - 1]
      : `${array[array.length - 1]}.`;
    return array.join(" ");
  });
}

// Handles the button where we can delete one character from the equation
export function handleDelete(solved, setResult, setSolved, setEquation) {
  if (solved) {
    setResult(BLANK);
    setSolved(false);
    return
  }
  setEquation((prev) => {
    if (prev === buttonConstants.ZERO || prev.length < 2)
      return buttonConstants.ZERO;
    if (operators.includes(prev[prev.length - 2])) {
      return prev.slice(0, prev.length - 3);
    }
    return prev.slice(0, prev.length - 1);
  });
}

// Handles appending an operator to the equation
export function handleOperator(operator, solved, setEquation, result, setResult, setSolved) {
  if (solved) {
    setEquation(result);
    setResult(BLANK);
    setSolved(false);
  }
  setEquation((prev) => {
    const equationStack = prev.split(" ");
    const lastIndex = equationStack.length - 1;
    const lastElement = equationStack[lastIndex];
    if (lastElement[lastElement.length - 1] === buttonConstants.DECIMAL)
      equationStack[lastIndex] = `${lastElement}0`;
    if (operators.includes(lastElement))
      equationStack[lastIndex] = operator;
    else
      equationStack.push(operator);
    return `${equationStack.join(" ")}`;
  });
}

// Handles the button to solve the calculation of the equation
export function handleResult(equation, result, setResult, solved, setSolved, setHistory) {
  if (operators.includes(equation[equation.length - 1]))
    return;
  setResult(() => {
    const equationArray = equation.split(" ");
    const stack = [];
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
    if (stack.length === 1)
      return stack[0].toString();
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
  setSolved(true);
  setHistory(prev => {
    return [
      ...prev,
      {
        equation: equation,
        result: result
      }
    ];
  });
}