import { Command } from '../../interfaces/Command';
import { Colors, EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export const command: Command = {
	name: 'botstats',
	ownerOnly: false,
	cooldown: 10,
	usage: '',
	data: new SlashCommandBuilder()
		.setName('botstats')
		.setDescription("Displays Asomataru's stats."),
	execute: async (client, interaction) => {
		const guildCount = (await client.guilds.fetch()).size;
		const memberCount = await client.guilds.cache.reduce(
			(acc, guild) => acc + guild.memberCount,
			0
		);

		const embed = new EmbedBuilder()
			.setColor(Colors.White)
			.setTitle("Asomataru's Bot Stats")
			.setFields([
				{
					name: 'Servers',
					value: `${guildCount} Servers`,
					inline: false,
				},
				{
					name: 'Users',
					value: `${memberCount} Users`,
					inline: false,
				},
			]);

		await interaction.reply({ embeds: [embed] });
	},
};
