import SearchBar from "./SearchBar"

const Header = props => {
	return (
		<header>
			<nav>
				<h1 className="text-cetner page-title">Weather Forecast around the World</h1>
				<SearchBar onChange={props.onChange} onSubmit={props.onSubmit} state={props.state} />
			</nav>
		</header>
	)
}

export default Header