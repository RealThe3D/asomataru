import axios from 'axios';
import prisma from '../../structures/prisma';
import { Colors, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { Command } from '../../interfaces/Command';

export const command: Command = {
	name: 'slap',
	ownerOnly: false,
	cooldown: 3,
	usage: 'slap (@mention or userID)',
	data: new SlashCommandBuilder()
		.setName('slap')
		.setDescription('Slap someone.')
		.addUserOption((option) =>
			option
				.setName('user')
				.setDescription(
					'User to target. If omitted, uses the user of this command as the target.'
				)
		),
	execute: async (client, interaction) => {
		let user = interaction.options.getUser('user') || interaction.user;

		const embed = new EmbedBuilder().setColor(Colors.Red);

		const { data } = await axios.get('https://nekos.life/api/v2/img/slap');

		if (user.id == interaction.user.id) {
			embed.setTitle('They... slapped themselves?');
		} else {
			embed.setTitle(`${interaction.user.username} slapped ${user.username}!`);
			const userData = await prisma.user.update({
				where: {
					userId: interaction.user.id,
				},
				data: {
					affection: {
						decrement: 5,
					},
				},
			});
			embed.setFooter({
				text: `That's mean!!! ._. , You lost 5 affection, you now have ${userData.affection} Affection...`,
			});
		}
		embed.setImage(data.url);

		await interaction.reply({ embeds: [embed] });
	},
};
