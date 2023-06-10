export function transformDate(str) {
	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};
	const date = new Date(Date.parse(str));

	return date.toLocaleDateString('en-US', options);
}

export function transformDateFull(str) {
	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};
	const fullDate = new Date(Date.parse(str));
	const date = fullDate.toLocaleString('en-US', options);
	const time = fullDate.toLocaleString('en-US', { timeStyle: 'short' });

	return `${date} at ${time}`;
}
