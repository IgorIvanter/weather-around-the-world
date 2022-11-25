// import { AsyncPaginate } from 'react-select-async-paginate'
import { useState, useRef, useEffect } from "react"

const SearchBar = props => {
	const ref = useRef()

	const [hasFocus, setFocus] = useState(false)	// tracks if the input field is focused
	const toggleFocus = () => { setFocus(!hasFocus) }	// toggles hasFocus

	useEffect(() => {	// initialize hasFocus properly
		if (document.hasFocus() && ref.current.contains(document.activeElement)) {
			setFocus(true);
		}
	}, [])

	const dropdownStyle = {
		backgroundColor: "whitesmoke",
		top: "0",
		padding: "1rem",
		borderRadius: "1rem",
		fontSize: "1.5rem",
		textDecoration: "underline"
	}

	return (
		<div
			className="search-container"
			style={{
				display: "flex",
				flexDirection: "column"
			}}>
			<div className="search">
				<form
					onSubmit={props.onSubmit}
					style={{
						display: "flex",
						border: "none"
					}}>
					<input
						type="text"
						placeholder="Search..."
						onChange={props.onChange}
						onSubmit={props.onSubmit}
						value={props.state.userInput}
						onFocus={toggleFocus}
						onBlur={toggleFocus}
						ref={ref}>
					</input>
					<button onClick={props.onSubmit}>Search!</button>
				</form>
			</div>
			<div
				className={`dropdown ${hasFocus && "opened"}`}
				style={dropdownStyle}>
				<ul>
					<li>Bucharest</li>
					<li>Moscow</li>
					<li>Dubai</li>
				</ul>
			</div>
		</div>)
}

export default SearchBar