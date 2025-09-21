import { type ColorResolvable, Colors } from "discord.js";

function selectRandomColor(): ColorResolvable {
	const keyColors = Object.keys(Colors);
	const randomItem = Math.floor(Math.random() * keyColors.length);
	const randomColorName = keyColors[randomItem];
	// @ts-expect-error The string works properly
	return Colors[randomColorName];
}
export { selectRandomColor };
