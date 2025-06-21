import "./App.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { add, sub, mul, div } from "./features/calc/calcSlice";

function App() {
	const finalResult = useSelector((state) => state.calc.result);
	const dispatch = useDispatch();

	const [firstNumberInput, setFirstNumberInput] = useState(null);
	const [secondNumberInput, setSecondNumberInput] = useState(null);
	const [result, setResult] = useState(null);

	// EVENT HANDLERS
	function handleSumClick() {
		dispatch(add({ number1: firstNumberInput, number2: secondNumberInput }));
	}

	function handleSubClick() {
		dispatch(sub({ number1: firstNumberInput, number2: secondNumberInput }));
	}

	function handleMultClick() {
		dispatch(mul({ number1: firstNumberInput, number2: secondNumberInput }));
	}

	function handleDivClick() {
		dispatch(div({ number1: firstNumberInput, number2: secondNumberInput }));
	}

	return (
		<div className="App">
			<div
				style={{
					height: "100vh",
					display: "flex",
					justifyContent: "center",
					flexDirection: "column",
					alignItems: "center",
					background: "teal",
				}}
			>
				{/* FIRST INPUT */}
				<label>First Number</label>
				<input
					value={firstNumberInput}
					onChange={(e) => setFirstNumberInput(e.target.value)}
				/>

				{/* SECOND INPUT */}
				<label>Second Number</label>
				<input
					value={secondNumberInput}
					onChange={(e) => setSecondNumberInput(e.target.value)}
				/>

				<button onClick={handleSumClick}>sum</button>

				<button onClick={handleSubClick}>subtract</button>

				<button onClick={handleMultClick}>multiply</button>

				<button onClick={handleDivClick}>divide</button>

				<hr />

				<h2>{finalResult}</h2>
			</div>
		</div>
	);
}

export default App;