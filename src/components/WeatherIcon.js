import CONSTANTS from "../constants"

const WeatherIcon = ({iconID}) => {
    return <img src={`${CONSTANTS.WEATHER_ICON_URL_START}${iconID}@2x.png`} alt="icon"></img>
}

export default WeatherIcon