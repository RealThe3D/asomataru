export function randomIndexOfArray(arr: any[]): any {
	const randomItem = arr[Math.floor(Math.random() * arr.length)];
	return randomItem;
}