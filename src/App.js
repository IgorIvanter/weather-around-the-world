import {React, useState, useEffect} from "react";
import NavBar from "./components/NavBar";
import Main from "./components/Main"


const api = {
	key: "076d1ea1151407ab670c718939b77745",
	requestStartWeather: "https://api.openweathermap.org/data/2.5/weather?",
	requestStartForecast: "https://api.openweathermap.org/data/2.5/forecast?"
}

export const ForecastTable = props => {
	const getTime = dt => {
		const date = new Date(dt * 1000)
		let hours = date.getHours()
		let minutes = date.getMinutes()
		return `${hours}:${minutes < 10 && 0}${minutes}`
	}

	const state = props.state
	return (
		<div>
			<h1 className="text-center">Weather Forecast</h1>
			<div style={{
				display: "flex",
				justifyContent: "center"
			}}>
				<table>
					<tbody>
						<tr>
							{state.forecastList ? state.forecastList.map((item, index) => {
								return (index < 5 && <td key={item.dt}>
														{getTime(item.dt)}
													</td>)
							}) : <td>Dick</td>}
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}

function App() {

	// borderWidth state is used to track if the borders are shown or not:

	const initialBorderWidthAfterLoading = 0

	const [borderWidth, setBorder] = useState(initialBorderWidthAfterLoading)

	const toggleBorders = (event) => {
		setBorder(prevColorIndex => 1 - prevColorIndex)
		document.documentElement.style.setProperty("--border-width", borderWidth)
		console.log(`Done. Border width: ${borderWidth}`)
	}

	useEffect(() => {
		document.documentElement.style.setProperty("--border-width", `${borderWidth}px`)
	}, [borderWidth])

	const userInputChangeHandler = event => {
		setState({
			...state,
			userInput: event.target.value
		})
	}

	const [state, setState] = useState({
		userInput: ""
	})

	// This effect sets up the initial data that's displayed on the screen directly after the page is loaded.

	// It shows the weather for the city {initialLocation}:

	useEffect(() => {
		const initialLocation = "Moscow"
		fetch(`${api.requestStartWeather}q=${initialLocation}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
		.then(res => {
			setState({
				temp: res.main.temp,
				feelsLike: res.main.feels_like,
				description: res.weather[0].description,
				location: `${res.name}, ${res.sys.country}`,
				userInput: ""
			})
		})
	}, [])

	const searchHandler = (event) => {
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
							description: forecastTimeStamp.weather[0].description
						}
					})
				})
			})
		})
	}

	useEffect(() => console.log("Re-rendered. Current state: ", state))

    return (
        <div className="App">
			<header>
				<NavBar onChange={userInputChangeHandler} onSubmit={searchHandler} state={state}></NavBar>
			</header>

			<Main state={state} />

			<button onClick={toggleBorders}>Enable borders</button>
        </div>
    );
}

export default App;