import { Colors, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { Command } from '../../interfaces/Command';

export const command: Command = {
	name: 'userinfo',
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'userinfo (@mention or userID)',
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Grabs info on a user.')
		.addUserOption((option) =>
			option
				.setName('user')
				.setDescription(
					'user to get info on. If omitted, defaults to your information'
				)
		),
	execute: async (client, interaction) => {
		let user = interaction.options.getUser('user') || interaction.user;

		const embed = new EmbedBuilder()
			.setThumbnail(`${user.displayAvatarURL()}`)
			.setColor(Colors.LuminousVividPink)
			.setFields([
				{ name: 'Full username', value: `${user.tag}`, inline: true },
				{ name: 'ID', value: `${user.id}`, inline: true },
				{ name: 'Bot', value: `${user.bot}`, inline: true },
				{ name: 'Joined Discord on', value: `${user.createdAt}`, inline: true },
			])
			.setFooter({ text: `Information about ${user.tag}` })
			.setTimestamp(new Date());
		await interaction.reply({ embeds: [embed] });
	},
};
