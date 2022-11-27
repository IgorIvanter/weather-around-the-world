import ForecastTable from "./ForecastTable"
// import WeatherIcon from "./WeatherIcon"
import capitalizeFirstLetter from "../capitalizeFirstLetter";
import { formatLocationName } from "../capitalizeFirstLetter";
import CONSTANTS from "../constants"


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
					{formatLocationName(`${state.location}, ${state.fullCountry !== undefined && state.fullCountry}`)}
					<DateBox />
				</div>
				<div className="temp-box">
					{Math.round(state.temp)}{CONSTANTS.CELCIUS_SYMBOL}
				</div>
				<div className="description-box text">
					<p className="text-center">
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