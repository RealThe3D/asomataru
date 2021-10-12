import { MessageEmbed } from 'discord.js';
import { Command } from '../../interfaces/Command';

export const command: Command = {
	name: 'kick',
	aliases: [],
	permissions: ['KICK_MEMBERS'],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'kick (@mention or userID) (reason)',
	execute: async (client, message, args) => {
		var fetchUser: string | undefined;

		if (!args[0]) return message.reply('Specify someone to kick, please.');
		if (message.mentions.users.size) {
			fetchUser = message.mentions.users.first()?.id || message.member?.id;
		}
		if (args[0].length == 18) {
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

		if (!user) {
			return message.reply('Specify a user to kick, please.');
		}
		if (user.user.bot) {
			return message.reply("I can't kick a bot!");
		}
		if (user.id === message.author.id) {
			return message.reply("You can't kick yourself, dummy!");
		}
		if (!user.bannable) {
			return message.reply("I can't kick this user!");
		}

		let reason = args.slice(1).join(' ') || 'No reason given';

		await user
			.kick()
			.catch((error: any) =>
				message.channel.send(`Sorry, I couldn't ban because of: ${error}`)
			);

		const embed = new MessageEmbed()
			.setColor('RED')
			.setTitle(`Ban | ${user.user.tag}`)
			.addField('User', `${user}`, true)
			.addField('Moderator', `${message.author.tag}`, true)
			.addField('Reason', reason, false)
			.setTimestamp();

		message.channel.send({ embeds: [embed] });
	},
};
