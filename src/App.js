import { React, useState, useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main"
import Footer from "./components/Footer";
import useBorder from "./hooks/useBorder";
import CONSTANTS from "./constants";


function App() {
	const toggleBorders = useBorder()	// This hook returns a function that shows/hides all borders of all elements in the doc

	const [state, setState] = useState({	// All weather forecasts and user input is stored in this state
		userInput: ""
	})

	const updateState = (location) => {		// Function to fetch data and update state
		fetch(`${CONSTANTS.API.requestStartWeather}q=${location}&units=metric&APPID=${CONSTANTS.API.key}`)
        .then(weatherResponse => weatherResponse.json())
		.then(weatherJSON => {
			fetch(`${CONSTANTS.API.requestStartForecast}q=${location}&units=metric&APPID=${CONSTANTS.API.key}`)
			.then(forecastResponse => forecastResponse.json())
			.then(forecastJSON => {
				console.log("Initial forecast response: ", forecastJSON)
				setState({
					temp: weatherJSON.main.temp,
					feelsLike: weatherJSON.main.feels_like,
					description: weatherJSON.weather[0].description,
					location: `${weatherJSON.name}, ${weatherJSON.sys.country}`,
					wind: weatherJSON.wind,
					icon: weatherJSON.weather[0].icon,
					userInput: "",
					forecastList: forecastJSON.list.map(forecastTimeStamp => {
						return {
							dt: forecastTimeStamp.dt,
							temp: forecastTimeStamp.main.temp,
							feelsLike: forecastTimeStamp.main.feels_like,
							wind: forecastTimeStamp.wind,
							description: forecastTimeStamp.weather[0].description,
							icon: forecastTimeStamp.weather[0].icon
						}
					})
				})
			}).catch(error => console.log(error))
		}).catch(error => console.log(error))
	}

	useEffect(() => {	// Sets up the initial data that's displayed on the screen directly after the page is loaded.
		const initialLocation = "Moscow"
		updateState(initialLocation)
	}, [])

	useEffect(() => console.log("Re-rendered. Current state: ", state))		// Effect for logging current state (for debugging):

	const handleInputChange = event => {	// onChange handler for controlled input field
		setState({
			...state,
			userInput: event.target.value
		})
	}

	const handleSubmit = event => {
		event.preventDefault();
		updateState(state.userInput)
	}

	return (
		<div className="App">
			<Header onChange={handleInputChange} onSubmit={handleSubmit} state={state} />

			<Main state={state} />

			<Footer state={state} />

			<button onClick={toggleBorders} style={{ position: "absolute", bottom: "0", left: "0", display: "none" }}>
				Enable borders
			</button>
		</div>
	);
}

export default App;