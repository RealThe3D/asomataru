import { Command } from '../../interfaces/Command';
import { MessageEmbed } from 'discord.js';

export const command: Command = {
	name: 'avatar',
	aliases: [],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 2,
	usage: 'avatar (@mention or userID)',
	execute: (client, message, args) => {
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
		const embed = new MessageEmbed()
			.setTitle(`${user.user.username}'s Avatar`)
			.setImage(
				user.user.displayAvatarURL({
					size: 512,
					format: 'jpg',
					dynamic: true,
				})
			);

		message.channel.send({ embeds: [embed] });
	},
};
