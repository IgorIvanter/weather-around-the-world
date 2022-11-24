import ForecastTable from "./ForecastTable"
import CONSTANTS from "../constants"


function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const DateBox = () => {
	const date = new Date()
	return <div className="date-box">
		{`${CONSTANTS.WEEK_DAYS[date.getDay()]}, ${CONSTANTS.MONTHS[date.getMonth()]} ${date.getDate()}st ${date.getFullYear()}`}
	</div>
}

const Main = ({state}) => {
    // Conditional Rendering: if the response to the initial request didn't come, <h1>Fetching data...<h1> is displayed */

	// TODO: for that, use a bool flag that will be stored in the state, false when data didn't come

	if (Object.keys(state).length > 1) {
		return (
			<main>
				<div className="location-box text-center text">
					{state.location}
					<DateBox />
				</div>
				<div className="temp-box text">
					{Math.round(state.temp)}{CONSTANTS.CELCIUS_SYMBOL}
				</div>
				<div className="description-box text-center text">
					Feels like {Math.round(state.feelsLike)}{CONSTANTS.CELCIUS_SYMBOL}. {capitalizeFirstLetter(state.description)}.
				</div>
				<ForecastTable state={state} />
			</main>)
	} else {
		return (<main><h1>Fetching data...</h1></main>)
	}
}

export default Main