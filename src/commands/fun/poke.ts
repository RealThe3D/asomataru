import { MessageEmbed } from 'discord.js';
import axios from 'axios';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Command } from '../../interfaces/Command';
import prisma from '../../structures/prisma';


export const command: Command = {
	name: 'poke',
	permissions: [],
	ownerOnly: false,
	enabled: false,
	cooldown: 3,
	usage: 'poke (@mention or userID)',
	data: new SlashCommandBuilder().setName('poke').setDescription('Poke someone')
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

		// const userData = await User.findOne({ userID: interaction.user.id });

		// if (!userData) {
		// 	return interaction.reply('No data on you! Use a!profile');
		// }
		const { data } = await axios.get('https://nekos.life/api/v2/img/poke');

		if (user.id == interaction.user.id) {
			embed.setTitle('They... poked themselves?');
		} else {
			embed.setTitle(
				`${interaction.user.username} poked ${user.username}...`
			);
			const userData = await prisma.user.update({
				where: {
					userId: interaction.user.id
				},
				data: {
					affection: {
						increment: 2
					}
				}
			});
			embed.setFooter(
				`You've gained 2 affection for poking someone? You now have ${userData.affection} Affection!`
			);
		}
		embed.setImage(data.url);

		await interaction.reply({ embeds: [embed] });
	},
};
