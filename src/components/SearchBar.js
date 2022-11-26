import { useEffect, useState, useRef, useCallback } from "react"
import useHover from "../hooks/useHover.js"
import useFocus from "../hooks/useFocus.js"
import { geoAPI } from '../constants.js'
import { formatLocationName } from "../capitalizeFirstLetter.js"


const minPopulation = 500000
const inputWidth = "20rem"


function SearchBar({ state, fetchState, onChange }) {

	const inputRef = useRef()	// Reference to the input element

	const inputFocused = useFocus(inputRef)		// inputFocused is set to track whether inputRef.current (the input) element is focused or not

	const [dropdownRef, dropdownHovered] = useHover()	// dropdownHovered is set to track whether dropdownRef.current (dropdown menu) is hovered over or not

	const [dropdownOpened, setDropdownOpened] = useState(inputFocused)	// defines whether dropdown menu is opened or not

	const [suggestions, setSuggestions] = useState([])	// list of suggestions

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

	const dropdownStyle = {
		backgroundColor: "whitesmoke",
		top: "0",
		padding: "1rem",
		borderRadius: "1rem",
		fontSize: "1.5rem",
		zIndex: 40
	}

	const updateSuggestions = useCallback(() => {	// updates suggestions based on current input
		if (state.userInput === "") {
			setSuggestions([])
			return
		}
		return fetch(`${geoAPI.requestStart}minPopulation=${minPopulation}&types=city&namePrefix=${state.userInput}`, geoAPI.options)
			.then(response => response.json())
			.then(json => {
				console.log("logging response: ", json)
				if (json.data === undefined) {
					return
				}
				setSuggestions(json.data.map(city => {
					return {
						name: city.name.toLowerCase(),
						country: city.country,
						lat: city.latitude,
						lon: city.longtitude
					}
				}))
			}
			)
			.catch(error => console.log(error))
	}, [state.userInput])

	useEffect(() => { updateSuggestions() }, [state.userInput, updateSuggestions]) // This effect calls the function thatupdates suggestions whenever userInput changes

	return (
		<div
			className="search-container"
			style={{
				display: "block",
				width: inputWidth
			}}>
			<div className="search">
				<input
					type="text"
					placeholder="Search..."
					onChange={event => {
						updateSuggestions()
						onChange(event)
					}}
					value={state.userInput}
					ref={inputRef}
					style={{
						display: "block",
						width: inputWidth
					}}
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
									console.log("Fetching from the inside of suggestions: ", city.country, city.name)
									fetchState(city.name, city.country)
									setDropdownOpened(false)
								}}
								style={{	// This style object creates borderBottom for every element except the last one. Serves as a divider.
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