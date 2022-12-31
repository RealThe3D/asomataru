import { Colors, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { Command } from '../../interfaces/Command';

export const command: Command = {
	name: 'credits',
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'credits',
	data: new SlashCommandBuilder()
		.setName('credits')
		.setDescription('Dedication towards friends or supporters.'),
	execute: async (client, interaction) => {
		const credits = [
			'Davska#6229 - Pro smash player, and loves the Sinnoh region! Happy about the remakes!',
			'Kandrina#1426 - Lovely woman from Austria, but plays too much Genshin!',
			"Akashic Bearer#2305 - A discord bot programmer who totally has a better bot than me, except it's not running V13.",
			'Mochi#7342 - Cool person, loves to eat mochi and plays a lot of Minecraft!',
			'Dr. Mathew#6718, worthy player and awesome artist',
			'Incineroar#7934 - Fatal memer and pro smash player',
			'SteelyMite#6098 - Busy with schoolwork but can manage to tell me oyasumi',
			'SirSailor Star#3528 - Loves Xenoblade and Fire Emblem!',
			"Daniel Diaz#9198 - Luxembourg's flag looks like aquafresh.",
			'InfiniteTime#0463 aka Asomataru-Chan, the person this bot is named after! Subscribe to their YouTube and Twitch!',
			'Mirjan#9930 - Fatal memer!',
		];
		const creditsEmbed = new EmbedBuilder()
			.setTitle('A dedication to my friends!')
			.setDescription(credits.join('\n\n'))
			.setColor(Colors.LuminousVividPink);
		await interaction.reply({ embeds: [creditsEmbed] });
	},
};
