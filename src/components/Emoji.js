const Emoji = props => (
        <span
                className="emoji"
                role="img"
                aria-label={props.label ? props.label : ""}
                aria-hidden={props.label ? "false" : "true"}
		style={props.style}
        >
                {props.symbol}
        </span>
);

export default Emoji