const ForecastTable = props => {
	const getTime = dt => {
		const date = new Date(dt * 1000)
		let hours = date.getHours()
		let minutes = date.getMinutes()
		return `${hours}:${minutes < 10 && 0}${minutes}`
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
								return (index < 5 && <td key={item.dt}>
														{getTime(item.dt)}
													</td>)
							}) : <td>Dick</td>}
						</tr>
						<tr>
							{state.forecastList.map((item, index) => {
								return (index < 5 && <td key={item.dt}>
														{Math.round(item.temp)}&deg;C
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