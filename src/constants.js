const CONSTANTS = {
	CELCIUS_SYMBOL: '\u00b0C',
	FAHRENHEIT_SYMBOL: '\u00b0F',
	WEEK_DAYS: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
	MONTHS: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	FORECAST_TIMESTAMPS_NUMBER: 5,    // defines how many columns there wil be in the ForecastTable
	MS_IN_A_SECOND: 1000,
	WEATHER_ICON_URL_START: "https://openweathermap.org/img/wn/",
	MOBILE_MAX_WIDTH: 990,
	LINKEDIN_PROFILE_URL: "https://www.linkedin.com/in/igor-ivanter-abab26256/",
	CONTACT_DATA: {
		LINKEDIN_PROFILE_URL: "https://www.linkedin.com/in/igor-ivanter-abab26256/",
		GITHUB_PROFILE_URL: "https://github.com/IgorIvanter"
	},
	API: {
		key: "076d1ea1151407ab670c718939b77745",
		requestStartWeather: "https://api.openweathermap.org/data/2.5/weather?",
		requestStartForecast: "https://api.openweathermap.org/data/2.5/forecast?"
	}
}

export default CONSTANTS