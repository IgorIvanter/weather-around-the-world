import useWindowDimensions from "../hooks/useWindowDimensions";
import CONSTANTS from "../constants";


const getTimeString = dt => {
    const date = new Date(dt * CONSTANTS.MS_IN_A_SECOND)
    let hours = date.getHours()
    return (hours < 10 ? "0" : "") + `${hours}:00`
}

const getDayString = dt => {
    const date = new Date(dt * CONSTANTS.MS_IN_A_SECOND)
    return `${CONSTANTS.WEEK_DAYS_SHORTENED[date.getDay()]}`
}

const ForecastTable = ({state, period}) => {
    const {width} = useWindowDimensions()
	const style = {
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		borderRadius: "1rem",
		width: "fit-content",
		margin: "5rem auto",
		padding: "1rem",
		boxShadow: "5px 5px rgba(0, 0, 0, 0.2)"
	}

    let formatDate
    let indexCondition

    switch(period) {
        case "day":
            formatDate = getTimeString
            indexCondition = index => index < CONSTANTS.FORECAST_TIMESTAMPS_NUMBER
            break
        case "week":
            formatDate = getDayString
            indexCondition = index => index % (CONSTANTS.HOURS_IN_A_DAY / CONSTANTS.FORECAST_TIMESTAMPS_FREQUENCY_HR) === 0
            break
        default:
            throw new TypeError("ForecastTable's period prop value can be either 'week' or 'day' ")
    }

    const formatProp = (item, propKey) => {
        switch(propKey) {
            case "dt":
                return formatDate(item.dt)
            case "temp":
                return `${Math.round(item.temp)}${CONSTANTS.CELCIUS_SYMBOL}`
            case "icon":
                return <img src={`${CONSTANTS.WEATHER_ICON_URL_START}${item.icon}@2x.png`} alt=""></img>
            default:
                throw new Error("Wrong property key. Either 'dt', 'temp' or 'icon' ")
        }
    }

	return (
		<div style={style} className="ForecastTable">
			<h1 className="text-center">{period === "day" ? "Today" : "This week (the same hour)"}</h1>
			<div style={{
				display: "flex",
				justifyContent: "center"
			}}>
                <table className="ForecastTable">
                    <tbody>
                        {width < CONSTANTS.MOBILE_MAX_WIDTH
                        ?
                        state.forecastList.map((item, index) => (
                            indexCondition(index)
                            && 
                            <tr key={index}>
                                {["dt", "temp", "icon"].map(propKey => (
                                    <td className={propKey === "icon" ? "icon-cell" : "text-center"} key={propKey}>
                                        {formatProp(item, propKey)}
                                    </td>)
                                )}
                            </tr>)
                        )
                        :
                        ["dt", "temp", "icon"].map(propKey => (
                            <tr key={propKey}>
                                {state.forecastList.map((item, index) => (
                                    indexCondition(index)
                                    && 
                                    <td className={propKey === "icon" ? "icon-cell" : "text-center"} key={item.dt}>
                                        {formatProp(item, propKey)}
                                    </td>))}
                            </tr>)
                        )}
                    </tbody>
                </table>
			</div>
		</div>
	)
}

export default ForecastTable