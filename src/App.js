import { React, useState, useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main"
import Footer from "./components/Footer";
import useBorder from "./hooks/useBorder";


const api = {
	key: "076d1ea1151407ab670c718939b77745",
	requestStartWeather: "https://api.openweathermap.org/data/2.5/weather?",
	requestStartForecast: "https://api.openweathermap.org/data/2.5/forecast?"
}

function App() {
	const toggleBorders = useBorder()	// This hook returns a function that shows/hides all borders of all elements in the doc

	const [state, setState] = useState({	// All weather forecasts and user input is stored in this state
		userInput: ""
	})

	useEffect(() => {	// Sets up the initial data that's displayed on the screen directly after the page is loaded.
		const initialLocation = "Moscow"
		fetch(`${api.requestStartWeather}q=${initialLocation}&units=metric&APPID=${api.key}`)
        .then(weatherResponse => weatherResponse.json())
		.then(weatherJSON => {
			fetch(`${api.requestStartForecast}q=${initialLocation}&units=metric&APPID=${api.key}`)
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

	const handleSubmit = (event) => {	// Search button click / submit handler
		event.preventDefault()
		fetch(`${api.requestStartWeather}q=${state.userInput}&units=metric&APPID=${api.key}`)
        .then(weatherResponse => weatherResponse.json())
		.then(weatherJSON => {
			fetch(`${api.requestStartForecast}q=${state.userInput}&units=metric&APPID=${api.key}`)
			.then(forecastResponse => forecastResponse.json())
			.then(forecastJSON => {
				console.log("Forecast response: ", forecastJSON)
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
	}

    return (
        <div className="App">
			<Header onChange={handleInputChange} onSubmit={handleSubmit} state={state}></Header>

			<Main state={state} />

			<Footer state={state} />

			<button onClick={toggleBorders} style={{ position: "absolute", bottom: "0", left: "0", display: "block" }}>
				Enable borders
			</button>
        </div>
    );
}

export default App;