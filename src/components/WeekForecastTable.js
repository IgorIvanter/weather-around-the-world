import useWindowDimensions from "../hooks/useWindowDimensions";
import CONSTANTS from "../constants";


const getDayString = dt => {
    const date = new Date(dt * CONSTANTS.MS_IN_A_SECOND)
    return `${CONSTANTS.WEEK_DAYS_SHORTENED[date.getDay()]}`
}

const formatProp = (item, propKey) => {
    switch(propKey) {
        case "dt":
            return getDayString(item.dt)
        case "temp":
            return `${Math.round(item.temp)}${CONSTANTS.CELCIUS_SYMBOL}`
        case "icon":
            return <img src={`${CONSTANTS.WEATHER_ICON_URL_START}${item.icon}@2x.png`} alt=""></img>
        default:
            throw new Error("Wrong property key. Either 'dt', 'temp' or 'icon' ")
    }
}

const HorizontalTable = ({state}) => {
    return (
        <table className="ForecastTable">
            <tbody>
                {["dt", "temp", "icon"].map(propKey => (
                    <tr key={propKey}>
                        {state.forecastList.map((item, index) => (
                            index % 8 === 0
                            && 
                            <td className={propKey === "icon" ? "icon-cell" : "text-center"} key={item.dt}>
                                {formatProp(item, propKey)}
                            </td>))}
                    </tr>)
                )}
            </tbody>
        </table>)
}

const VerticalTable = ({state}) => {
    return (
        <table className="ForecastTable">
            <tbody>
                {state.forecastList.map((item, index) => (
                    index % 8 === 0
                    && 
                    <tr key={index}>
                        {["dt", "temp", "icon"].map(propKey => (
                            <td className={propKey === "icon" ? "icon-cell" : "text-center"} key={propKey}>
                                {formatProp(item, propKey)}
                            </td>)
                        )}  
                    </tr>)
                )}
            </tbody>
        </table>)
}

const WeekForecastTable = ({state}) => {
    const {width} = useWindowDimensions()
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
			<h1 className="text-center">This week</h1>
			<div style={{
				display: "flex",
				justifyContent: "center"
			}}>
				{width > CONSTANTS.MOBILE_MAX_WIDTH ? <HorizontalTable state={state} /> : <VerticalTable state={state} />}
			</div>
		</div>
	)
}

export default WeekForecastTable