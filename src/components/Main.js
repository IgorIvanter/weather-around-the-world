import ForecastTable from "./ForecastTable"
import WeatherIcon from "./WeatherIcon"
import CONSTANTS from "../constants"
// import WeekForecastTable from "./WeekForecastTable";


function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const DateBox = () => {
	const date = new Date()
	return (
		<div className="date-box">
			{`${CONSTANTS.WEEK_DAYS[date.getDay()]}, ${CONSTANTS.MONTHS[date.getMonth()]} ${date.getDate()}st ${date.getFullYear()}`}
		</div>)
}

const Main = ({state}) => {
    // Conditional Rendering: if the response to the initial request didn't come, <h1>Fetching data...<h1> is displayed */

	// TODO: for that, use a bool flag that will be stored in the state, false when data didn't come

	if (Object.keys(state).length > 1) {
		return (
			<main>
				<div className="location-box text-center text">
					{state.location}, {state.fullCountry !== undefined && state.fullCountry}
					<DateBox />
				</div>
				<div className="temp-box">
					<WeatherIcon iconID={state.icon} style={{height: "9rem"}} />
					{Math.round(state.temp)}{CONSTANTS.CELCIUS_SYMBOL}
				</div>
				<div className="description-box text-center text">
					<p>
						Feels like {Math.round(state.feelsLike)}{CONSTANTS.CELCIUS_SYMBOL}. {capitalizeFirstLetter(state.description)}.
						Wind {state.wind.speed} m/s
					</p>
				</div>
				<ForecastTable state={state} period="day" />
				<ForecastTable state={state} period="week" />
 			</main>)
	} else {
		return (<main><h1>Fetching data...</h1></main>)
	}
}

export default Main