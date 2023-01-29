import { Command } from '../../interfaces/Command';
import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export const command: Command = {
	name: 'botstats',

	ownerOnly: false,

	cooldown: 10,
	usage: '',
	data: new SlashCommandBuilder()
		.setName('botstats')
		.setDescription("Display's Asomataru's stats."),
	execute: async (client, interaction) => {
		const embed = new EmbedBuilder()
			.setTitle("Asomataru's Bot Stats")
			.setFields([
				{
					name: 'Guilds',
					value: `${client.guilds.cache.size} guilds`,
					inline: false,
				},
				{
					name: 'Users',
					value: `${client.users.cache.size} users`,
					inline: false,
				},
			]);

		await interaction.reply({ embeds: [embed] });
	},
};
