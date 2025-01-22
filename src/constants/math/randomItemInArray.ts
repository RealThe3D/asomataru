export function randomItemInArray<Type>(arr: Type[]): Type {
	const randomItem = arr[Math.floor(Math.random() * arr.length)];
	return randomItem;
}
