const CONSTANTS = {
	CELCIUS_SYMBOL: '\u00b0C',
	FAHRENHEIT_SYMBOL: '\u00b0F',
	WEEK_DAYS: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
	WEEK_DAYS_SHORTENED: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
	HOURS_IN_A_DAY: 24,
	MONTHS: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	FORECAST_TIMESTAMPS_NUMBER: 5,    // defines how many columns there wil be in the ForecastTable
	MS_IN_A_SECOND: 1000,
	GEOCODING_REQUEST_TIMEOUT_MS: 1000,
	WEATHER_ICON_URL_START: "https://openweathermap.org/img/wn/",
	MOBILE_MAX_WIDTH: 990,
	LINKEDIN_PROFILE_URL: "https://www.linkedin.com/in/igor-ivanter-abab26256/",
	FORECAST_TIMESTAMPS_FREQUENCY_HR: 3,
	CONTACT_DATA: {
		LINKEDIN_PROFILE_URL: "https://www.linkedin.com/in/igor-ivanter-abab26256/",
		GITHUB_PROFILE_URL: "https://github.com/IgorIvanter"
	},
	API: {
		key: "076d1ea1151407ab670c718939b77745",
		requestStartWeather: "https://api.openweathermap.org/data/2.5/weather?",
		requestStartForecast: "https://api.openweathermap.org/data/2.5/forecast?"
	},
}

export const geoAPI = {
	options: {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '6494caa2bdmsh563fa6da6235c68p18f750jsna65131608f40',
			'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
		}
	},
	requestStart: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities?'
}

export default CONSTANTS