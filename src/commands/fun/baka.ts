import { MessageEmbed } from 'discord.js';
import { Command } from '../../interfaces/Command';
import axios from 'axios';
import { SlashCommandBuilder } from '@discordjs/builders';
import prisma from '../../structures/prisma';

export const command: Command = {
	name: 'baka',
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'baka (@mention)',
	data: new SlashCommandBuilder().setName('baka').setDescription('Call someone a baka.')
		.addUserOption(option => option.setName('user').setDescription('User to target. If omitted, uses the user of this command as the target.')),
	execute: async (client, interaction) => {
		const embed = new MessageEmbed();
		const user = interaction.options.getUser('user') || interaction.user;

		// !args[0] && (fetchUser = message.member?.id);
		// if (message.mentions.users.size) {
		// 	fetchUser = message.mentions.users.first()?.id || message.member?.id;
		// }
		// if (args[0] && args[0].length == 18) {
		// 	fetchUser =
		// 		message.guild?.members.cache.get(args[0])?.id || message.member?.id;
		// }
		// // if (!isNaN(args[0]) && args[0].length === 18) {
		// 	var member = message.guild?.members.cache.get(args[0]) || message.member;
		// 	user = member?.user;
		// } else {
		// 	user = message.mentions.users.first()?.id || message.member;
		// }
		// const user = message.guild?.members.cache.find(
		// 	(mem) => mem.id == fetchUser
		// );

		// if (!user) return message.reply('No one was found.');

		const { data } = await axios.get('https://nekos.life/api/v2/img/baka');

		if (user.id == interaction.user.id) {
			embed.setTitle('They\'re calling themselves... a baka?');
		} else {
			embed.setTitle(`${user.tag} is a baka!`);
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
				`You've lost 5 affection for being mean! You now have ${userData.affection} Affection.`
			);
		}
		embed.setColor('RED');
		embed.setImage(data.url);
		await interaction.reply({ embeds: [embed] });
	},
};
