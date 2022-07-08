import axios from 'axios';
import prisma from '../../structures/prisma';
import { MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Command } from '../../interfaces/Command';

export const command: Command = {
	name: 'slap',
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 3,
	usage: 'slap (@mention or userID)',
	data: new SlashCommandBuilder().setName('slap').setDescription('Slap someone.')
		.addUserOption(option => option.setName('user').setDescription('User to target. If omitted, uses the user of this command as the target.')),
	execute: async (client, interaction) => {
		let user = interaction.options.getUser('user');
		if(!user) {
			user = interaction.user;
		}
		// var fetchUser: string | undefined;

		// !args[0] && (fetchUser = message.member?.id);
		// if (message.mentions.users.size) {
		// 	fetchUser = message.mentions.users.first()?.id || message.member?.id;
		// }
		// if (args[0] && args[0].length == 18) {
		// 	fetchUser =
		// 		message.guild?.members.cache.get(args[0])?.id || message.member?.id;
		// }
		// // if (!isNaN(args[0]) && args[0].length === 18) {
		// // 	var member = message.guild?.members.cache.get(args[0]) || message.member;
		// // 	user = member?.user;
		// // } else {
		// // 	user = message.mentions.users.first()?.id || message.member;
		// // }
		// const user = message.guild?.members.cache.find(
		// 	(mem) => mem.id == fetchUser
		// );

		// if (!user) return message.reply('No one was found.');
		const embed = new MessageEmbed().setColor('RED');

		const { data } = await axios.get('https://nekos.life/api/v2/img/slap');

		if (user.id == interaction.user.id) {
			embed.setTitle('They... slapped themselves?');
		} else {
			embed.setTitle(
				`${interaction.user.username} slapped ${user.username}!`
			);
			const userData = await prisma.user.update({
				where: {
					userId: interaction.user.id
				},
				data: {
					affection: {
						decrement: 5
					}
				}
			});
			embed.setFooter(
				`That's mean!!! ._. , You lost 5 affection, you now have ${userData.affection} Affection...`
			);
		}
		embed.setImage(data.url);

		await interaction.reply({ embeds: [embed] });
	},
};
