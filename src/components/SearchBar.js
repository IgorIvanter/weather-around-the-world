import { useState, useRef, useEffect } from "react"
import { geoAPI } from '../constants.js'


const SearchBar = props => {
	const state = props.state

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

	const [suggestions, setSuggestions] = useState([])

	const updateSuggestions = () => {
		const minPopulation = 500000
		return fetch(`${geoAPI.requestStart}minPopulation=${minPopulation}&namePrefix=${state.userInput}`, geoAPI.options)
			.then(response => response.json())
			.then(json => setSuggestions(json.data.map(city => {
				return {
					name: city.name.toLowerCase(),	// also need country
					lat: city.latitude,
					lon: city.longtitude
				}
			}))
			)
			.catch(error => console.log(error))
	}

	// useEffect(() => setSuggestions([{name: "Moscow"}, {name: "Warsaw"}]), [state.userInput])

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
						onChange={event => {
							updateSuggestions()
							props.onChange(event)
						}}
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
					{suggestions.map(city => <li key={city.name}>{city.name}</li>)}
				</ul>
			</div>
		</div>)
}

export default SearchBar