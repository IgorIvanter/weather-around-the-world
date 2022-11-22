import SearchBar from "./SearchBar"

const NavBar = props => {
	return (
		<nav>
			<h1 className="text-cetner">Weather Forecast around the World</h1>
			<SearchBar onChange={props.onChange} onSubmit={props.onSubmit} weather={props.weather} />
		</nav>
	)
}

export default NavBar