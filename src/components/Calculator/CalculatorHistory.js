import "./CalculatorHistory.css";
import { handleHistoryClear, handleJumpBack } from "./buttonHandlers";

const CalculatorHistory = ({ history, setHistory, setResult, setEquation }) => {
	const HistoryItem = ({ equation, result, index }) => (
		<div className="calculator--history--item">
			<div>
        <button
          className="calculator--history--item--button"
          disabled={index===history.length - 1}
          onClick={() => handleJumpBack(index, history, {setEquation, setResult, setHistory})}
        >&#8618;</button>{" "}
				{equation} = <b>{result}</b>
			</div>
		</div>
	);

	const renderHistoryItems = () =>
		history
			.map(({ equation, result }, i) => (
				<HistoryItem key={i} index={i} equation={equation} result={result} />
			))
			.reverse();

	return (
		<div className="container calculator--history">
			<h2 className="calculator--history--heading">History</h2>
			<button className="calculator--history--button" onClick={() => handleHistoryClear(setHistory)}>Clear</button>
			{renderHistoryItems()}
		</div>
	);
};

export default CalculatorHistory;
