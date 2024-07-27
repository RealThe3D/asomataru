import { Colors, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { Command } from '../../interfaces/Command';

export const command: Command = {
	name: 'credits',
	ownerOnly: false,
	cooldown: 0,
	usage: 'credits',
	data: new SlashCommandBuilder()
		.setName('credits')
		.setDescription('A dedication towards friends and/or supporters.'),
	execute: async (client, interaction) => {
		const credits = [
			'Davska (davska) - Pro smash player, and loves the Sinnoh region! Happy about the remakes!',
			'Kandrina (kandrina) - Lovely woman from Austria, but eats too many ribs',
			'Akashic Bearer (akashicbearer) - A discord bot programmer who totally has a better bot than me, except it is not running v14.',
			'Mochi (mo\\_mochi) - Cool person, loves to eat mochi and is not a fan of veins.',
			'Dr. Mathew (dr.mathew) - Worthy player and awesome artist',
			'Incineroar (incinesk) - One Piece connoisseur and pro smash player!',
			'SteelyMite (steelymite) - Graduated from University! I am proud of him!',
			'Luna (infinitetime) aka Asomataru-Chan - The person this bot is named after! Subscribe to their YouTube and Twitch!',
			'Ditlus (ditlus) - An aspiring cook from Costa Rica! 🥰',
		];
		const creditsEmbed = new EmbedBuilder()
			.setTitle('A dedication to my friends!')
			.setDescription(credits.join('\n\n'))
			.setColor(Colors.LuminousVividPink);
		await interaction.reply({ embeds: [creditsEmbed] });
	},
};
