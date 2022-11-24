import DateBox from "./DateBox"
// import { Emoji } from "./Emoji";
import ForecastTable from "./ForecastTable"


const Main = props => {
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

	const state = props.state

	/* Conditional Rendering: if the response to the initial request didn't come, <h1>Fetching data...<h1> is displayed */

	return Object.keys(state).length > 1 ? (
		<div>
			<main>
				<div className="location-box text-center text">
					{state.location}
					<DateBox />
				</div>
				<div className="temp-box">
					{Math.round(state.temp)} &deg;C
				</div>
				<div className="description-box text-center text">
					Feels like {Math.round(state.feelsLike)}&deg;C. {capitalizeFirstLetter(state.description)}.
				</div>
				<ForecastTable state={state} />
			</main>
		</div>)
		: 
		(
			<main>
				<h1>Fetching data...</h1>
			</main>
		)
}

export default Main