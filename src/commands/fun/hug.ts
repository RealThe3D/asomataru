import { MessageEmbed } from 'discord.js';
import axios from 'axios';
import { Command } from '../../interfaces/Command';
import { SlashCommandBuilder } from '@discordjs/builders';
import prisma from '../../structures/prisma';

export const command: Command = {
	name: 'hug',
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 3,
	usage: 'hug (@mention or userID)',
	data: new SlashCommandBuilder().setName('hug').setDescription('Hug someone')
		.addUserOption(option => option.setName('user').setDescription('User to target. If omitted, uses the user of this command as the target.')),
	execute: async (client, interaction) => {
		const user = interaction.options.getUser('user') || interaction.user;
		// var fetchUser: string | undefined;

		// !args[0] && (fetchUser = message.member?.id);
		// if (message.mentions.users.size) {
		// 	fetchUser = message.mentions.users.first()?.id || message.member?.id;
		// }
		// if (args[0] && args[0].length == 18) {
		// 	fetchUser =
		// 		message.guild?.members.cache.get(args[0])?.id || message.member?.id;
		// }
		// if (!isNaN(args[0]) && args[0].length === 18) {
		// 	var member = message.guild?.members.cache.get(args[0]) || message.member;
		// 	user = member?.user;
		// } else {
		// 	user = message.mentions.users.first()?.id || message.member;
		// }
		// const user = message.guild?.members.cache.find(
		// 	(mem) => mem.id == fetchUser
		// );

		// if (!user) return message.reply('No one was found.');
		const embed = new MessageEmbed().setColor('#FFB6C1');
		const { data } = await axios.get('https://nekos.life/api/v2/img/hug');

		if (user.id == interaction.user.id) {
			embed.setTitle('They... hugged themselves?');
		} else {
			embed.setTitle(
				`${interaction.user.username} hugged ${user.username}!`
			);
			const userData = await prisma.user.update({
				where: {
					userId: interaction.user.id
				},
				data: {
					affection: {
						increment: 10
					}
				}
			});
			embed.setFooter(
				`You've gained 10 affection for being generous! You now have ${userData.affection} Affection!`
			);
		}
		embed.setImage(data.url);

		await interaction.reply({ embeds: [embed] });
	},
};
