import { Colors, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { Command } from '@/interfaces/Command.ts';

export const command: Command = {
	name: 'credits',
	ownerOnly: false,
	cooldown: 0,
	usage: 'credits',
	data: new SlashCommandBuilder()
		.setName('credits')
		.setDescription('A dedication towards friends and/or supporters.'),
	execute: async (_, interaction) => {
		const credits = [
			'Davska (davska) - Pro smash player, and loves the Sinnoh region! Happy about the remakes!',
			'Kandrina (kandrina) - Lovely woman from Austria, but eats too many ribs',
			'Akashic Bearer (akashicbearer) - A discord bot programmer who totally has a better bot than me, except it is not running v14.',
			'Mochi (mo\\_mochi) - Cool person, loves to eat mochi and is not a fan of veins.',
			'Incineroar (incinesk) - One Piece connoisseur and pro smash player!',
			'SteelyMite (steelymite) - Graduated from University! I am proud of him!',
			'Luna (infinitetime) aka Asomataru-Chan - The person this bot is named after! Subscribe to their YouTube and Twitch!',
			'Ditlus (ditlus) - An aspiring cook from Costa Rica! 🥰',
			'Winnie (winxyclub) - A local Floridian fairy, but when will they move to the eastern side?',
			'Kayla (qtkayla13) - Pro Minecraft and volleyball player, and she also smells!',
			'Bubba (bubbaholderofls) - Pro Hypixel player, but he should carry me through Catacombs F7!',
			'Aidan (hirsuna) - Pro Hypixel player, and some of his quotes are the greatest humanity has ever made.',
		];
		const creditsEmbed = new EmbedBuilder()
			.setTitle('A dedication to my friends!')
			.setDescription(credits.join('\n\n'))
			.setColor(Colors.LuminousVividPink);
		await interaction.reply({ embeds: [creditsEmbed] });
	},
};
