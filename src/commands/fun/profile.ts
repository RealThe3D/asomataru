import { Command } from '../../interfaces/Command';
import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import prisma from '../../structures/prisma';

export const command: Command = {
	name: 'profile',
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'profile (@mention or userID)',
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('Display a profile.')
		.addUserOption((option) =>
			option
				.setName('user')
				.setDescription(
					'User to target. If omitted, uses the user of this command as the target.'
				)
		),
	execute: async (client, interaction) => {
		const user = interaction.options.getUser('user') || interaction.user;

		if (user.bot) return await interaction.reply('That is a bot.');

		const userData = await prisma.user.findUnique({
			where: {
				userId: interaction.user.id,
			},
			rejectOnNotFound: true,
		});

		const embed = new EmbedBuilder()
			.setTitle(`${user.username}'s Stats`)
			.setFields([
				{ name: 'Coins', value: `${userData.coins} coins`, inline: true },
				{
					name: 'Affection',
					value: `${userData.affection} affection`,
					inline: true,
				},
			])
			.setFooter({ text: 'WORK IN PROGRESS' });
		await interaction.reply({ embeds: [embed] });
	},
};
