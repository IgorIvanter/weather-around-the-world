import SearchBar from "./SearchBar"

const NavBar = props => {
	return (
		<nav>
			<h1 className="text-cetner">Weather Forecast around the World</h1>
			<SearchBar onChange={props.onChange} onSubmit={props.onSubmit} state={props.state} />
		</nav>
	)
}

export default NavBar