import {React, useState} from "react";

const api = {
	key: "076d1ea1151407ab670c718939b77745",
	base: "https://api.openweathermap.org/data/2.5/"
  }

function App() {
	const [userInput, setUserInput] = useState("")

	const [weather, setWeather] = useState({
		temp: 3,
		description: "Sunny, some clouds",
		location: "Moscow"
	})

	const searchHandler = () => {
		// console.log("Search handler called...")
		fetch(`${api.base}weather?q=${userInput}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
		.then(res => {
			console.log(res)
			setWeather({
				temp: res.main.temp,
				description: res.weather[0].description,
				location: userInput
			})
		})
	}

	const userInputChangeHandler = event => {
		// console.log("Change handler called...")
		setUserInput(event.target.value)
	}

	// window.addEventListener("keydown", event => event.key === "Enter" ? searchHandler() : 0)
	
    return (
        <div className="App">
			<main>
				<h1 className="text-center">This is my weather app!</h1>
				<div style={{display: "flex", justifyContent: "center"}} className="search">
					<input
						type="text"
						placeholder="Search..." 
						onChange={userInputChangeHandler}
						style={{
							fontSize: "2rem",
							width: "50%"
						}}/>
					<button onClick={searchHandler}>Search!</button>
				</div>
				<h1 className="text-center">{weather.location}</h1>
				<h1 className="text-center">{weather.description}. It's {Math.round(weather.temp)} degrees.</h1>
			</main>
        </div>
    );
}

export default App;
