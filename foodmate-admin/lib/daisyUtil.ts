export function isThemeDark (name: string) {
	name = name.toLocaleLowerCase();
	return name === "dark" ? true : false;
}

export function isArrayContainsDark (array: string[]) {
	return array.some((item) => isThemeDark(item));
}