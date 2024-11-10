import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import axios from 'axios';
import { Command } from '@/interfaces/Command.ts';
import prisma from '@/structures/prisma.ts';

export const command: Command = {
	name: 'poke',
	ownerOnly: false,
	cooldown: 3,
	usage: 'poke (@mention or userID)',
	data: new SlashCommandBuilder()
		.setName('poke')
		.setDescription('Poke someone')
		.setDefaultMemberPermissions(0)
		.addUserOption((option) =>
			option
				.setName('user')
				.setDescription(
					'User to target. If omitted, uses the user of this command as the target.',
				)
		),
	execute: async (_, interaction) => {
		const user = interaction.options.getUser('user') || interaction.user;

		const embed = new EmbedBuilder().setColor('#FFB6C1');
		const { data } = await axios.get('https://nekos.life/api/v2/img/poke');

		if (user.id == interaction.user.id) {
			embed.setTitle('They... poked themselves?');
		} else {
			embed.setTitle(`${interaction.user.username} poked ${user.username}...`);
			const userData = await prisma.user.update({
				where: {
					userId: interaction.user.id,
				},
				data: {
					affection: {
						increment: 2,
					},
				},
			});
			embed.setFooter({
				text:
					`You've gained 2 affection for poking someone? You now have ${userData.affection} Affection!`,
			});
		}
		embed.setImage(data.url);

		await interaction.reply({ embeds: [embed] });
	},
};
