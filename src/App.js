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

	useEffect(() => {	// Sets up the initial data that's displayed on the screen directly after the page is loaded.
		const initialLocation = "Moscow"
		fetch(`${CONSTANTS.API.requestStartWeather}q=${initialLocation}&units=metric&APPID=${CONSTANTS.API.key}`)
                .then(weatherResponse => weatherResponse.json())
		.then(weatherJSON => {
			fetch(`${CONSTANTS.API.requestStartForecast}q=${initialLocation}&units=metric&APPID=${CONSTANTS.API.key}`)
			.then(forecastResponse => forecastResponse.json())
			.then(forecastJSON => {
				console.log("Initial forecast response: ", forecastJSON)
				setState({
					temp: weatherJSON.main.temp,
					feelsLike: weatherJSON.main.feels_like,
					description: weatherJSON.weather[0].description,
					location: `${weatherJSON.name}, ${weatherJSON.sys.country}`,
					userInput: "",
					forecastList: forecastJSON.list.map(forecastTimeStamp => {
						return {
							dt: forecastTimeStamp.dt,
							temp: forecastTimeStamp.main.temp,
							feelsLike: forecastTimeStamp.main.feels_like,
							description: forecastTimeStamp.weather[0].description,
							icon: forecastTimeStamp.weather[0].icon
						}
					})
				})
			})
		})
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
		fetch(`${CONSTANTS.API.requestStartWeather}q=${state.userInput}&units=metric&APPID=${CONSTANTS.API.key}`)
			.then(weatherResponse => weatherResponse.json())
			.then(weatherJSON => {
				fetch(`${CONSTANTS.API.requestStartForecast}q=${state.userInput}&units=metric&APPID=${CONSTANTS.API.key}`)
					.then(forecastResponse => forecastResponse.json())
					.then(forecastJSON => {
						console.log("Forecast response: ", forecastJSON);
						setState({
							temp: weatherJSON.main.temp,
							feelsLike: weatherJSON.main.feels_like,
							description: weatherJSON.weather[0].description,
							location: `${weatherJSON.name}, ${weatherJSON.sys.country}`,
							userInput: "",
							forecastList: forecastJSON.list.map(forecastTimeStamp => {
								return {
									dt: forecastTimeStamp.dt,
									temp: forecastTimeStamp.main.temp,
									feelsLike: forecastTimeStamp.main.feels_like,
									description: forecastTimeStamp.weather[0].description,
									icon: forecastTimeStamp.weather[0].icon
								};
							})
						});
					});
			});
	}

	return (
		<div className="App">
			<Header onChange={handleInputChange} onSubmit={handleSubmit} state={state} />

			<Main state={state} />

			<Footer state={state} />

			<button onClick={toggleBorders} style={{ position: "absolute", bottom: "0", left: "0", display: "block" }}>
				Enable borders
			</button>
		</div>
	);
}

export default App;