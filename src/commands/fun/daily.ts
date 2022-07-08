import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';
import prisma from '../../structures/prisma';
import { Command } from '../../interfaces/Command';

export const command: Command = {
	name: 'daily',
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 86400,
	usage: 'daily',
	data: new SlashCommandBuilder().setName('daily').setDescription('Redeem your dailies.'),
	execute: async (client, interaction) => {
		const randomAmount = Math.floor(Math.random() * Math.floor(750)); // 1-750
		
		const user = await prisma.user.update({
			where: {
				userId: interaction.user.id
			},
			data: {
				coins: {
					increment: randomAmount
				}
			},
			select: {
				coins: true
			},
		});

		const embed = new MessageEmbed()
			.setColor('GREEN')
			.setTitle(`${interaction.user.username}'s Daily Rewards`)
			.setDescription(`Your daily reward is ${randomAmount} coins! You now have ${user.coins} coins.`);
		await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};
