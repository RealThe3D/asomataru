import { Command } from '@/interfaces/Command.ts';
import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import prisma from '@/structures/prisma.ts';

export const command: Command = {
	name: 'profile',
	ownerOnly: false,
	cooldown: 0,
	usage: 'profile (@mention or userID)',
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('Display a profile.')
		.addUserOption((option) =>
			option
				.setName('user')
				.setDescription(
					'User to target. If omitted, uses the user of this command as the target.',
				)
		),
	execute: async (_, interaction) => {
		const user = interaction.options.getUser('user') || interaction.user;

		if (user.bot) {
			return await interaction.reply({
				content: 'That is a bot.',
				ephemeral: true,
			});
		}

		const userData = await prisma.user.findUnique({
			where: {
				userId: interaction.user.id,
			},
		});

		if (!userData) {
			return await interaction.reply({
				content: 'This user has not set up a profile.',
				ephemeral: true,
			});
		}

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
