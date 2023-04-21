export function transformPathName(pathname) {
	const str = pathname.split('/')[2];
	const header = str.replace('-', ' ');
	return header.toUpperCase();
}
