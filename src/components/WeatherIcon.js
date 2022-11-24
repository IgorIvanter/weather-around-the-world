import CONSTANTS from "../constants"

const WeatherIcon = ({iconID, ...props}) => {
    return <img src={`${CONSTANTS.WEATHER_ICON_URL_START}${iconID}@2x.png`} alt="icon" {...props}></img>
}

export default WeatherIcon