import { Colors, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import prisma from '@/structures/prisma.ts';
import { Command } from '@/interfaces/Command.ts';

export const command: Command = {
	name: 'daily',
	ownerOnly: false,
	cooldown: 86400,
	usage: 'daily',
	data: new SlashCommandBuilder()
		.setName('daily')
		.setDescription('Redeem your dailies.'),
	execute: async (_, interaction) => {
		const randomAmount = Math.floor(Math.random() * Math.floor(750)); // 1-750

		const user = await prisma.user.update({
			where: {
				userId: interaction.user.id,
			},
			data: {
				coins: {
					increment: randomAmount,
				},
			},
		});

		const embed = new EmbedBuilder()
			.setColor(Colors.Green)
			.setTitle(`${interaction.user.username}'s Daily Rewards`)
			.setDescription(
				`Your daily reward is ${randomAmount} coins! You now have ${user.coins} coins.`,
			);
		await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};
