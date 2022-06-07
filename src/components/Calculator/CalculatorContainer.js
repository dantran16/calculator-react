import { useEffect, useState } from "react";
import Calculator from "./Calculator";
import CalculatorHistory from "./CalculatorHistory";
import { BLANK, buttonConstants } from "./calculatorConstants";

const CalculatorContainer = () => {
	const [history, setHistory] = useState([]);
	const [result, setResult] = useState(BLANK);
	const [equation, setEquation] = useState(buttonConstants.ZERO);

	useEffect(() => {
		console.log(history);
	}, [history]);

	return (
		<div className="main">
			<Calculator
				result={result}
				setResult={setResult}
				equation={equation}
				setEquation={setEquation}
				setHistory={setHistory}
			/>
			<CalculatorHistory
				history={history}
				setResult={setResult}
				setEquation={setEquation}
				setHistory={setHistory}
			/>
		</div>
	);
};

export default CalculatorContainer;
