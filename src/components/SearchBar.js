import { useEffect, useState, useRef } from "react"
import useHover from "../hooks/useHover.js"
// import useFocus from "../hooks/useFocus.js"
import { geoAPI } from '../constants.js'
import { formatLocationName } from "../capitalizeFirstLetter.js"
import  useFocus from "../hooks/useFocus.js"


const minPopulation = 500000

function SearchBar({ state, fetchState, onSubmit, onChange }) {

	const inputRef = useRef()

	const inputFocused = useFocus(inputRef)

	const [dropdownRef, dropdownHovered] = useHover()

	const [dropdownOpened, setDropdownOpened] = useState(inputFocused)

	const [suggestions, setSuggestions] = useState([])

	useEffect(() => {
		if (!inputFocused && !dropdownHovered) {
			setDropdownOpened(false)
		}
		if (inputFocused) {
			setDropdownOpened(true)
		}
		if (dropdownHovered) {
			setDropdownOpened(true)
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

	useEffect(() => {
		updateSuggestions()
	}, [state.userInput])

	const updateSuggestions = () => {
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
	}

	return (
		<div
			className="search-container"
			style={{
				display: "block",
				width: "20rem"
			}}>
			<div className="search">
				<input
					type="text"
					placeholder="Search..."
					onChange={event => {
						updateSuggestions()
						onChange(event)
					} }
					onSubmit={onSubmit}
					value={state.userInput}
					ref={inputRef}
					style={{
						display: "block",
						width: "20rem"
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
								} }
								style={{ borderBottom: index === suggestions.length - 1 ? "none" : "2px solid grey" }}
								// This style object creates borderBottom for every element except the last one. Serves as a divider.
								key={city.name}>
								{formatLocationName(`${city.name}, ${city.country}`)}
							</li>)
					})}
				</ul>
			</div>
		</div>)
}

export default SearchBar