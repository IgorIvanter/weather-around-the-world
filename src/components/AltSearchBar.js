import { AsyncPaginate } from "react-select-async-paginate";
import { geoAPI } from '../constants.js'

const AltSearchBar = ({ state, setState, onChange, onSubmit, fetchState}) => {
    const minPopulation = 500000
    const loadOptions = userInput => {
        return fetch(`${geoAPI.requestStart}minPopulation=${minPopulation}&namePrefix=${userInput}`, geoAPI.options)
            .then(response => response.json())
            .then(json => {
                return {
                    options: json.data.map(city => {
                        return {
                            value: city.name,
                            label: city.name.toUpperCase()
                        }
                    })
                }
            })
            .catch(error => console.log(error))
    }

    return <AsyncPaginate
        placeholder="Alt search bar"
        debounceTimeout={1000}
        value={state.userInput}
        onChange={(event) => {
            console.log(`Change handler from inside AsPa: ${JSON.stringify(event)}`)
            // setState({...state, userInput: event.value})
            fetchState(event.value)
        }}
        loadOptions={loadOptions}
        style={{backgroundColor: "black"}}
    />
}

export default AltSearchBar