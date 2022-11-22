const SearchBar = props => {
	return (<div className="search">
				<form 
					onSubmit={props.onSubmit}
					style={{
						display: "flex",
						border: "none"
					}}>
					<input
						type="text"
						placeholder="Search..."
						onChange={props.onChange}
						onSubmit={props.onSubmit}
						value	={props.state.userInput}>
						</input>
					<button onClick={props.onSubmit}>Search!</button>
				</form>
			</div>)
}

export default SearchBar