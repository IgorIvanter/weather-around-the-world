function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatLocationName(locationName) {
	return locationName.split(' ').map(word => capitalizeFirstLetter(word)).join(' ')
}

export default capitalizeFirstLetter