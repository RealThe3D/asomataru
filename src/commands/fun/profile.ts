import { Command } from '../../interfaces/Command';
import { MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import prisma from '../../structures/prisma';

export const command: Command = {
	name: 'profile',
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'profile (@mention or userID)',
	data: new SlashCommandBuilder().setName('profile').setDescription('Display a profile.')
		.addUserOption(option => option.setName('user').setDescription('User to target. If omitted, uses the user of this command as the target.')),
	execute: async (client, interaction) => {
		const user = interaction.options.getUser('user') || interaction.user;

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
		if (user.bot) return interaction.reply('That is a bot.');
		const userData = await prisma.user.findUnique({
			where: {
				userId: interaction.user.id
			},
			rejectOnNotFound: true
		});

		const embed = new MessageEmbed()
			.setTitle(`${user.username}'s Stats`)
			.addField('Coins', `${userData.coins} Coins`, true)
			.addField('Affection', `${userData.affection} Affection`, true)
			.setFooter('WORK IN PROGRESS');
		await interaction.reply({ embeds: [embed] });
	},
};
