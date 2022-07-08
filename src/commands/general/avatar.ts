import { Command } from '../../interfaces/Command';
import { MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

export const command: Command = {
	name: 'avatar',
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 2,
	usage: 'avatar (@mention or userID)',
	data: new SlashCommandBuilder().setName('avatar').setDescription('Displays a user\'s avatar')
		.addUserOption(option => 
			option.setName('user').setDescription('user avatar to display. If omitted, displays your avatar.')),
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

		const embed = new MessageEmbed()
			.setTitle(`${user.username}'s Avatar`)
			.setImage(
				user.displayAvatarURL({
					size: 512,
					format: 'jpg',
					dynamic: true,
				})
			);

		await interaction.reply({ embeds: [embed] });
	},
};
