import { Guild, EmbedBuilder, SlashCommandBuilder, Colors } from 'discord.js';
import { Command } from '../../interfaces/Command';
import { verification } from '../../declarations/verification';

export const command: Command = {
	name: 'serverinfo',
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 3,
	usage: 'serverinfo',
	data: new SlashCommandBuilder()
		.setName('serverinfo')
		.setDescription('Info on the current guild this command is executed on.'),
	execute: async (client, interaction) => {
		const guild = interaction.guild as Guild;

		const embed = new EmbedBuilder()
			.setColor(Colors.Green)
			.setThumbnail(`${guild.iconURL()}`)
			.setAuthor({ name: `${guild.name}` })
			.setFields([
				{ name: 'Name', value: `${guild.name}`, inline: true },
				{ name: 'ID', value: `${guild.id}`, inline: true },
				{ name: 'Owner', value: `${await guild.fetchOwner()}` },
				{
					name: 'Verification Level',
					value: `${guild.verificationLevel}`,
					inline: true,
				},
				{ name: 'Members', value: `${guild.memberCount}, inline: true` },
				{ name: 'Roles', value: `${guild.roles.cache.size}`, inline: true },
				{
					name: 'Channels',
					value: `${guild.channels.cache.size}`,
					inline: true,
				},
			])
			.setFooter({ text: `Created ${guild.createdAt}` });

		await interaction.reply({ embeds: [embed] });
	},
};
