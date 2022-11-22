const DateBox = () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
	const date = new Date()
	return <div className="date-box">
		{`${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}st ${date.getFullYear()}`}
	</div>
}

export default DateBox