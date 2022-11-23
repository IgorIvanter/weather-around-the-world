const FORECAST_TIMESTAMPS_NUMBER = 5;   // defines how many columns there wil be in the ForecastTable
const MS_IN_A_SECOND = 1000
const ICON_URL_START = "https://openweathermap.org/img/wn/"

const ForecastTable = props => {
	const getTime = dt => {
		const date = new Date(dt * MS_IN_A_SECOND)
		let hours = date.getHours()
        return (hours < 10 ? "0" : "") + `${hours}:00`
	}
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
		<div style={style}>
			<h1 className="text-center">Weather Forecast</h1>
			<div style={{
				display: "flex",
				justifyContent: "center"
			}}>
				<table>
					<tbody>
						<tr>
							{state.forecastList ? state.forecastList.map((item, index) => {
								return (
                                    index < FORECAST_TIMESTAMPS_NUMBER
                                    && 
                                    <td className="text-center" key={item.dt}>
                                        {getTime(item.dt)}
                                    </td>)
							}) : <td>Dick</td>}
						</tr>
						<tr>
							{state.forecastList.map((item, index) => {
								return (
                                    index < FORECAST_TIMESTAMPS_NUMBER
                                    &&
                                    <td className="text-center" key={item.dt}>
                                        {Math.round(item.temp)}&deg;C
                                    </td>)
							})}
						</tr>
                        <tr>
							{state.forecastList.map((item, index) => {
								return (
                                    index < FORECAST_TIMESTAMPS_NUMBER
                                    &&
                                    <td className="text-center icon-cell" key={item.dt}>
                                        <img src={`${ICON_URL_START}${item.icon}@2x.png`} alt="" ></img>
                                    </td>)
							})}
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default ForecastTable