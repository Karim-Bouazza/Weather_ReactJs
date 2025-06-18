import { useState, useReducer } from "react";
import karim from "./karim";



export default function Calcul () {
    const [firstNumberInput, setFirstNumberInput] = useState(null);
	const [secondNumberInput, setSecondNumberInput] = useState(null);
    const [result, dispatch] = useReducer(karim, 1);
	// EVENT HANDLERS
	function handleSumClick() {
        dispatch({type: "add", payload: {
           number1: firstNumberInput,
           number2: secondNumberInput,
        }});
	}

	function handleSubClick() {
		dispatch({type: "sub", payload: {
           number1: firstNumberInput,
           number2: secondNumberInput,
        }});
	}

	function handleMultClick() {
		dispatch({type: "mul", payload: {
           number1: firstNumberInput,
           number2: secondNumberInput,
        }});
	}

	function handleDivClick() {
		dispatch({type: "div", payload: {
           number1: firstNumberInput,
           number2: secondNumberInput,
        }});
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

				<h2>{result}</h2>
			</div>
		</div>
    )
}