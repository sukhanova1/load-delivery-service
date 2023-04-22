export function transformCreatedDate(str) {
	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};
	const date = new Date(Date.parse(str));

	return date.toLocaleDateString('en-US', options);
}
