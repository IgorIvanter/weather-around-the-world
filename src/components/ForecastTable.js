import useWindowDimensions from "../hooks/useWindowDimensions";
import CONSTANTS from "../constants";


const getTime = dt => {
    const date = new Date(dt * CONSTANTS.MS_IN_A_SECOND)
    let hours = date.getHours()
    return (hours < 10 ? "0" : "") + `${hours}:00`
}

const HorizontalTable = ({state}) => {
    return (
            <table>
                <tbody>
                    <tr>
                        {state.forecastList.map((item, index) => (
                            index < CONSTANTS.FORECAST_TIMESTAMPS_NUMBER
                            && 
                            <td className="text-center" key={item.dt}>
                                {getTime(item.dt)}
                            </td>))}
                    </tr>
                    <tr>
                        {state.forecastList.map((item, index) => (
                            index < CONSTANTS.FORECAST_TIMESTAMPS_NUMBER
                            &&
                            <td className="text-center" key={item.dt}>
                                {Math.round(item.temp)}{CONSTANTS.CELCIUS_SYMBOL}
                            </td>))}
                    </tr>
                    <tr>
                        {state.forecastList.map((item, index) => (
                            index < CONSTANTS.FORECAST_TIMESTAMPS_NUMBER
                            &&
                            <td className="text-center icon-cell" key={item.dt}>
                                <img src={`${CONSTANTS.WEATHER_ICON_URL_START}${item.icon}@2x.png`} alt=""></img>
                            </td>))}
                    </tr>
                </tbody>
            </table>)
}

const VerticalTable = ({state}) => {
        return (
            <table>
                <tbody>
                    {state.forecastList ? state.forecastList.map((item, index) => {
                        return (
                            index < CONSTANTS.FORECAST_TIMESTAMPS_NUMBER
                            && 
                            <tr key={index}>
                                    <td className="text-center">
                                        {getTime(item.dt)}
                                    </td>
                                    <td className="text-center">
                                        {Math.round(item.temp)}{CONSTANTS.CELCIUS_SYMBOL}
                                    </td>
                                    <td className="text-center icon-cell" key={item.dt}>
                                        <img src={`${CONSTANTS.WEATHER_ICON_URL_START}${item.icon}@2x.png`} alt="" ></img>
                                    </td>
                            </tr>)
                    }) : <td>Dick</td>}
                </tbody>
            </table>)
}

const ForecastTable = props => {
        const {width} = useWindowDimensions()

	const state = props.state
	const style = {
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		borderRadius: "1rem",
		width: "fit-content",
		margin: "5rem auto",
		padding: "1rem",
		boxShadow: "5px 5px rgba(0, 0, 0, 0.2)"
	}
	return (
		<div style={style} className="ForecastTable">
			<h1 className="text-center">Today</h1>
			<div style={{
				display: "flex",
				justifyContent: "center"
			}}>
				{width > CONSTANTS.MOBILE_MAX_WIDTH ? <HorizontalTable state={state} /> : <VerticalTable state={state} />}
			</div>
		</div>
	)
}

export default ForecastTable