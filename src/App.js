import { React, useState, useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main"
import Footer from "./components/Footer";
import CONSTANTS from "./constants";


function App() {
	const [state, setState] = useState({	// All weather forecasts and user input is stored in this state
		userInput: ""
	})

	function fetchStateByCoords(city) {		// fetches weather forecast and updates the state
		fetch(`${CONSTANTS.API.requestStartWeather}lat=${city.lat}&lon=${city.lon}&units=metric&APPID=${CONSTANTS.API.key}`)
			.then(weatherResponse => weatherResponse.json())
			.then(weatherJSON => {
				fetch(`${CONSTANTS.API.requestStartForecast}lat=${city.lat}&lon=${city.lon}&units=metric&APPID=${CONSTANTS.API.key}`)
					.then(forecastResponse => forecastResponse.json())
					.then(forecastJSON => {
						console.log("Initial forecast response: ", forecastJSON);
						setState({
							temp: weatherJSON.main.temp,
							feelsLike: weatherJSON.main.feels_like,
							description: weatherJSON.weather[0].description,
							location: city.name,
							fullCountry: city.country,
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
								};
							})
						});
					}).catch(error => console.log(error));
			}).catch(error => console.log(error));
	}

	useEffect(() => {	// Sets up the initial data that's displayed on the screen directly after the page is loaded.
		const initCity = {
			name: "Moscow",
			country: "Russia",
			lat: 55.76,
			lon: 37.62
		}
		fetchStateByCoords(initCity)
	}, [])

	return (
		<div className="App">
			<Header state={state} fetchStateByCoords={fetchStateByCoords} setState={setState} />

			<Main state={state} />

			<Footer state={state} />
		</div>
	);
}

export default App;