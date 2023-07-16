import { Colors, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { Command } from '../../interfaces/Command';

export const command: Command = {
	name: 'credits',
	ownerOnly: false,
	cooldown: 0,
	usage: 'credits',
	data: new SlashCommandBuilder()
		.setName('credits')
		.setDescription('Dedication towards friends and/or supporters.'),
	execute: async (client, interaction) => {
		const credits = [
			'Davska (davska)- Pro smash player, and loves the Sinnoh region! Happy about the remakes!',
			'Kandrina (kandrina) - Lovely woman from Austria, but eats too many ribs',
			"Akashic Bearer (akashicbearer) - A discord bot programmer who totally has a better bot than me, except it's not running V13.",
			'Mochi (mo_mochi) - Cool person, loves to eat mochi and plays a lot of Minecraft!',
			'Dr. Mathew (dr. mathew), worthy player and awesome artist',
			'Incineroar (incine_) - Fatal memer and pro smash player',
			'SteelyMite (steelymite) - Busy with schoolwork but can manage to tell me oyasumi',
			'SirSailor Star (sirsailorstar) - Loves Xenoblade and Fire Emblem!',
			'InfiniteTime (infinitetime) aka Asomataru-Chan, the person this bot is named after! Subscribe to their YouTube and Twitch!',
			'Ditlus (ditlus) - An aspiring cook from Costa Rica! 🥰',
		];
		const creditsEmbed = new EmbedBuilder()
			.setTitle('A dedication to my friends!')
			.setDescription(credits.join('\n\n'))
			.setColor(Colors.LuminousVividPink);
		await interaction.reply({ embeds: [creditsEmbed] });
	},
};
