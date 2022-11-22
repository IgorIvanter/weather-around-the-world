import DateBox from "./DateBox"


const Main = props => {
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

	const weather = props.weather

	/* Conditional Rendering: if the response to the initial request didn't come, <h1>Fetching data...<h1> is displayed */

	return Object.keys(weather).length ? (<main>
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
	)
}

export default Main