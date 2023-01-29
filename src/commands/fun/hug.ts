import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import axios from 'axios';
import { Command } from '../../interfaces/Command';
import prisma from '../../structures/prisma';

export const command: Command = {
	name: 'hug',

	ownerOnly: false,

	cooldown: 3,
	usage: 'hug (@mention or userID)',
	data: new SlashCommandBuilder()
		.setName('hug')
		.setDescription('Hug someone')
		.addUserOption((option) =>
			option
				.setName('user')
				.setDescription(
					'User to target. If omitted, uses the user of this command as the target.'
				)
		),
	execute: async (client, interaction) => {
		const user = interaction.options.getUser('user') || interaction.user;
		const embed = new EmbedBuilder().setColor('#FFB6C1');
		const { data } = await axios.get('https://nekos.life/api/v2/img/hug');

		if (user.id == interaction.user.id) {
			embed.setTitle('They... hugged themselves?');
		} else {
			embed.setTitle(`${interaction.user.username} hugged ${user.username}!`);
			const userData = await prisma.user.update({
				where: {
					userId: interaction.user.id,
				},
				data: {
					affection: {
						increment: 10,
					},
				},
			});
			embed.setFooter({
				text: `You've gained 10 affection for being generous! You now have ${userData.affection} Affection!`,
			});
		}
		embed.setImage(data.url);

		await interaction.reply({ embeds: [embed] });
	},
};
