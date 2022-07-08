import { MessageEmbed } from 'discord.js';
import { Command } from '../../interfaces/Command';
import { status } from '../../declarations/status';
import { SlashCommandBuilder } from '@discordjs/builders';

export const command: Command = {
	name: 'userinfo',
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'userinfo (@mention or userID)',
	data: new SlashCommandBuilder().setName('userinfo').setDescription('Grabs info on a user.')
		.addUserOption(option => 
			option
				.setName('user')
				.setDescription('user to get info on. If omitted, defaults to your information')),
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
		// if (!user) return;

		const embed = new MessageEmbed()
			.setThumbnail(`${user.displayAvatarURL()}`)
			.setColor('LUMINOUS_VIVID_PINK')
			.addField('Full username', `${user.tag}`, true)
			.addField('ID', user.id, true)
			// .addField('Nickname', user.? user.nickname : 'None', true)
			.addField('Bot', `${user.bot}`, true)
			// .addField('Status', `${user.presence?.status}`, true)
			.addField('Joined Discord on', `${user.createdAt}`)
			.setFooter(`Information about ${user.tag}`)
			.setTimestamp(new Date());
		await interaction.reply({ embeds: [embed] });
	},
};
