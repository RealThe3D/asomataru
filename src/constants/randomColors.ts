import { ColorResolvable, Colors } from 'discord.js';

function selectRandomColor(): ColorResolvable {
	const keyColors = Object.keys(Colors);
	const randomItem = Math.floor(Math.random() * keyColors.length);
	const foo = keyColors[randomItem];
	// @ts-expect-error The string works properly
	return Colors[foo];
}
export { selectRandomColor };
