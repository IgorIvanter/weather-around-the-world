import {React, useState, useEffect} from "react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const api = {
	key: "076d1ea1151407ab670c718939b77745",
	base: "https://api.openweathermap.org/data/2.5/",
	baseForecast: "https://api.openweathermap.org/data/2.5/forecast"
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const Forecast = (props) => {
	return <table>
		<tbody>
			<tr>
				{[0, 1, 2, 3].map(element => <td key={element}>{element}</td>)}	
			</tr>
		</tbody>
	</table>
}

const NavBar = props => {
	return (
		<nav>
			<h1 className="text-cetner">Weather Forecast around the World</h1>
			<SearchBar onChange={props.onChange} onSubmit={props.onSubmit} />
		</nav>
	)
}

const SearchBar = props => {
	return (<div className="search">
				<form 
					onSubmit={props.onSubmit}
					style={{
						display: "flex",
						border: "none"
					}}>
					<input
						type="text"
						placeholder="Search..." 
						onChange={props.onChange}
						onSubmit={props.onSubmit}></input>
					<button onClick={props.onSubmit}>Search!</button>
				</form>
			</div>)
}

const DateBox = () => {
	const date = new Date()
	return <div className="date-box">
		{`${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}st ${date.getFullYear()}`}
	</div>
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

	// userInput is the string currently in the input field:

	const [userInput, setUserInput] = useState("")

	const userInputChangeHandler = event => setUserInput(event.target.value)

	const [weather, setWeather] = useState({})

	// This effect sets up the initial data that's displayed on the screen directly after the page is loaded.

	// It shows the weather for the city {initialLocation}:

	useEffect(() => {
		const initialLocation = "Moscow"
		fetch(`${api.base}weather?q=${initialLocation}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
		.then(res => {
			setWeather({
				temp: res.main.temp,
				description: res.weather[0].description,
				location: `${res.name}, ${res.sys.country}`
			})
		})
	}, [])

	const [forecast, setForecast] = useState(
		fetch(`${api.base}forecast?q=Moscow&units=metric&APPID=${api.key}`)
		.then(res => res.json())
	)

	const searchHandler = (event) => {
		event.preventDefault()
		console.log("Search handler called...")
		fetch(`${api.base}weather?q=${userInput}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
		.then(res => {
			setWeather({
				temp: res.main.temp,
				description: res.weather[0].description,
				location: `${res.name}, ${res.sys.country}`
			})
		})

		fetch(`${api.baseForecast}?q=${userInput}&&units=metric&APPID=${api.key}`)
		.then(res => res.json())
		.then(res => {
			console.log(res)
			for (let weatherSnapShot of res.list) {
				const date = new Date(weatherSnapShot.dt * 1000)
				// console.log(
				// 	`${date.getHours()}:${date.getMinutes()} ${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}st ${date.getFullYear()}`,
				// 	weatherSnapShot.dt
				// )
			}
		})
	}



    return (
        <div className="App">
			<header>
				<NavBar onChange={userInputChangeHandler} onSubmit={searchHandler}></NavBar>
			</header>

			{/* Conditional Rendering: if the response to the initial request didn't come, <h1>Fetching data...<h1> is displayed */}

			{Object.keys(weather).length ? (<main>
				<div className="location-box text-center">
					{weather.location}
					<DateBox />
				</div>
				<div className="temp-box">
					{Math.round(weather.temp)} &deg;C
				</div>
				<div className="description-box text-center">
					{capitalizeFirstLetter(weather.description)}
				</div>
			</main>) : (
				<main>
					<h1>Fetching data...</h1>
				</main>
			)}
			<button onClick={toggleBorders}>Enable borders</button>
        </div>
    );
}

export default App;
