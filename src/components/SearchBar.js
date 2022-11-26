import { useEffect, useState, useRef, useCallback } from "react"
import useHover from "../hooks/useHover.js"
import useFocus from "../hooks/useFocus.js"
import { geoAPI } from '../constants.js'
import { formatLocationName } from "../capitalizeFirstLetter.js"


const MIN_POPULATION = 500000	// Minimal population for a city to be displayed in the suggestions list
const INPUT_WIDTH = "20rem"		// The fixed width of the input field


function SearchBar({ state, fetchState, setState }) {

	const dropdownStyle = {		// Inline styling for the dropdown menu
		backgroundColor: "whitesmoke",
		top: "0",
		padding: "1rem",
		borderRadius: "1rem",
		fontSize: "1.5rem",
		zIndex: 40
	}

	const commonWidthStyle = {		// Sets the same width for the input field and the dropdown menu
		display: "block",
		width: INPUT_WIDTH
	}

	const [suggestions, setSuggestions] = useState([])	// list of suggestions

	const inputRef = useRef()	// Reference to the input element

	const inputFocused = useFocus(inputRef)		// inputFocused is set to track whether inputRef.current (the input) element is focused or not

	const [dropdownRef, dropdownHovered] = useHover()	// dropdownHovered is set to track whether dropdownRef.current (dropdown menu) is hovered over or not

	const [dropdownOpened, setDropdownOpened] = useState(inputFocused)	// defines whether dropdown menu is opened or not

	const updateSuggestions = useCallback((code) => {	// updates suggestions based on current input
		switch (code) {
			case 0:
				console.log(`Fetching from inside the input onChange function for prefix ${state.userInput}`)
				break
			case 1:
				console.log(`Fetching from inside the useEffect for prefix ${state.userInput}`)
				break
			default:
				throw new Error("Something went wrong nigga...")
		}

		if (state.userInput === "") {
			setSuggestions([])

			return
		}

		return fetch(`${geoAPI.requestStart}minPopulation=${MIN_POPULATION}&types=city&namePrefix=${state.userInput}`, geoAPI.options)
			.then(response => response.json())
			.then(json => {
				console.log("logging response: ", json)
				if (json.data === undefined) {
					return
				}
				setSuggestions(json.data.map(city => {
					return {
						name: city.name.toLowerCase(),
						country: city.country.toLowerCase(),
						lat: city.latitude,
						lon: city.longtitude
					}
				}))
			}).catch(error => console.log(error))
	}, [state.userInput])

	function handleInputChange(event) {		// handles new search terms
		setState({
			...state,
			userInput: event.target ? event.target.value : ""
		})
	}

	useEffect(() => {	// This effect opens/closes the dropdown suggestions list based on inputFocused and dropdownHovered
		if (inputFocused || dropdownHovered) {
			setDropdownOpened(true)
		} else {
			setDropdownOpened(false)
		}
		if (suggestions.length === 0) {
			setDropdownOpened(false)
		}
	}, [inputFocused, dropdownHovered, state, suggestions])

	useEffect(() => {	// This effect calls the function that updates suggestions whenever userInput changes
		updateSuggestions(1)
	}, [state.userInput, updateSuggestions])

	return (
		<div
			className="search-container"
			style={commonWidthStyle}>
			<div className="search">
				<input
					type="text"
					placeholder="Search..."
					onChange={handleInputChange}
					value={state.userInput}
					ref={inputRef}
					style={commonWidthStyle}
				>
				</input>
			</div>
			<div
				className={`dropdown ${dropdownOpened && "opened"}`}
				style={dropdownStyle}
				ref={dropdownRef}>
				<ul>
					{suggestions.map((city, index) => {
						return (
							<li className="suggestion"
								onClick={() => {
									console.log("Fetching from the inside of onClick on suggestions: ", city.country, city.name)
									fetchState(city.name, city.country)
									setDropdownOpened(false)
								}}
								style={{
									borderBottom: index === suggestions.length - 1 ? "none" : "2px solid grey"
								}}	
								key={city.name}>
								{formatLocationName(`${city.name}, ${city.country}`)}
							</li>)
					})}
				</ul>
			</div>
		</div>)
}

export default SearchBar