import { useEffect, useState } from "react"
import useHover from "../hooks/useHover.js"
import useFocus from "../hooks/useFocus.js"
import { geoAPI } from '../constants.js'


const minPopulation = 500000


const SearchBar = props => {
	const state = props.state

	const [inputRef, inputFocused, toggleInputFocus] = useFocus()

	const [dropdownRef, dropdownHovered] = useHover()

	const dropdownStyle = {
		backgroundColor: "whitesmoke",
		top: "0",
		padding: "1rem",
		borderRadius: "1rem",
		fontSize: "1.5rem",
		textDecoration: "underline"
	}

	const [suggestions, setSuggestions] = useState([])

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
						style={{
							backgroundColor: inputFocused ? "red" : "yellow"
						}}>
					</input>
					<button onClick={props.onSubmit}>Search!</button>
				</form>
			</div>
			<div
				className={`dropdown ${(inputFocused || dropdownHovered) && "opened"}`}
				style={{...dropdownStyle, backgroundColor: dropdownHovered ? "green" : "blue"}}
				ref={dropdownRef}>
				<ul>
					{suggestions.map(city => {
						return (
							<li key={city.name}>
								<button onClick={() => {
									console.log(`Fetching data about location: ${city.name}`)
									props.fetchState(city.name)
								}} >
									{city.name}
								</button>
							</li>)
					})}
				</ul>
			</div>
		</div>)
}

export default SearchBar