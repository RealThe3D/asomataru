import { Colors, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { Command } from '@/interfaces/Command.ts';

export const command: Command = {
	name: 'userinfo',
	ownerOnly: false,
	cooldown: 0,
	usage: 'userinfo (@mention or userID)',
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Grabs info on a user.')
		.addUserOption((option) =>
			option
				.setName('user')
				.setDescription(
					'user to get info on. If omitted, defaults to your information',
				)
		),
	execute: async (_, interaction) => {
		const user = interaction.options.getUser('user') || interaction.user;

		const embed = new EmbedBuilder()
			.setThumbnail(`${user.displayAvatarURL()}`)
			.setColor(Colors.LuminousVividPink)
			.setFields([
				{ name: 'Full Username', value: `${user.tag}`, inline: true },
				{ name: 'ID', value: `${user.id}`, inline: true },
				{ name: 'Bot', value: `${user.bot ? 'True' : 'False'}`, inline: true },
			])
			.setFooter({ text: `Information about ${user.tag}` })
			.setTimestamp(new Date());
		await interaction.reply({ embeds: [embed] });
	},
};
