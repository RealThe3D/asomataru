import { Command } from '../../interfaces/Command';
import { MessageEmbed } from 'discord.js';
import { modelSchema as User } from '../../models/userModel';
export const command: Command = {
	name: 'profile',
	aliases: ['stats'],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'profile (@mention or userID)',
	execute: async (client, message, args) => {
		var fetchUser: string | undefined;

		!args[0] && (fetchUser = message.member?.id);
		if (message.mentions.users.size) {
			fetchUser = message.mentions.users.first()?.id || message.member?.id;
		}
		if (args[0] && args[0].length == 18) {
			fetchUser =
				message.guild?.members.cache.get(args[0])?.id || message.member?.id;
		}
		// if (!isNaN(args[0]) && args[0].length === 18) {
		// 	var member = message.guild?.members.cache.get(args[0]) || message.member;
		// 	user = member?.user;
		// } else {
		// 	user = message.mentions.users.first()?.id || message.member;
		// }
		const user = message.guild?.members.cache.find(
			(mem) => mem.id == fetchUser
		);

		if (!user) return message.reply('No one was found.');
		if (user.user.bot) return message.reply(`That is a bot.`);
		let data = await User.findOne({ userID: user.id });

		if (!data) {
			await User.create({ userID: message.author.id });
			return message.channel.send(
				`Your account was created, ${message.author.username}!`
			);
		}

		const embed = new MessageEmbed()
			.setTitle(`${user.user.username}'s Stats`)
			.addField('Coins', `${data.coins} Coins`, true)
			.addField('Affection', `${data.affection} Affection`, true)
			.setFooter('WORK IN PROGRESS');
		message.channel.send({ embeds: [embed] });
	},
};
