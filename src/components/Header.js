import SearchBar from "./SearchBar"

const Header = props => {
	return (
		<header>
			<nav>
				<h1 className="text-cetner page-title">Weather around the World</h1>
				<SearchBar {...props} />
			</nav>
		</header>
	)
}

export default Header