import { useEffect, useState } from "react"
import useHover from "../hooks/useHover.js"
import useFocus from "../hooks/useFocus.js"
import { geoAPI } from '../constants.js'


const minPopulation = 500000


const SearchBar = props => {
	const state = props.state

	const [inputRef, inputFocused, toggleInputFocus] = useFocus()

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
		textDecoration: "underline"
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
				console.log(json)
				setSuggestions(json.data.map(city => {
					return {
						name: city.name.toLowerCase(),	// also need country
						country: city.country,
						lat: city.latitude,
						lon: city.longtitude
					}
				}))
			}
			)
			.catch(error => console.log(error))
	}

	// useEffect()

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
						onFocus={toggleInputFocus}
						onBlur={toggleInputFocus}
						ref={inputRef}
						// style={{
						// 	backgroundColor: inputFocused ? "red" : "yellow"
						// }}
						>
					</input>
					<button onClick={props.onSubmit}>Search!</button>
				</form>
			</div>
			<div
				className={`dropdown ${dropdownOpened && "opened"}`}
				style={{
					...dropdownStyle,
					// backgroundColor: dropdownHovered ? "green" : "blue"
				}}
				ref={dropdownRef}>
				<ul>
					{suggestions.map(city => {
						return (
							<li className="suggestion"
								onClick={() => {
									console.log("Fetching from the inside of suggestions: ", city.country, city.name)
									props.fetchState(city.name, city.country)
									setDropdownOpened(false)
								}}
								key={city.name}>
									{city.name}
							</li>)
					})}
				</ul>
			</div>
		</div>)
}

export default SearchBar