import { MessageEmbed } from 'discord.js';
import { Command } from '../../interfaces/Command';
import { status } from '../../declarations/status';

export const command: Command = {
	name: 'userinfo',
	aliases: ['user'],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'userinfo (@mention or userID)',
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
		if (!user) return;

		const embed = new MessageEmbed()
			.setThumbnail(`${user.user.displayAvatarURL()}`)
			.setColor('LUMINOUS_VIVID_PINK')
			.addField('Full username', `${user.user.tag}`, true)
			.addField('ID', user.id, true)
			.addField('Nickname', user.nickname ? user.nickname : 'None', true)
			.addField('Bot', `${user.user.bot}`, true)
			// .addField('Status', `${user.presence?.status}`, true)
			.addField('Joined Discord on', `${user.user.createdAt}`)
			.setFooter(`Information about ${user.user.tag}`)
			.setTimestamp();
		message.channel.send({ embeds: [embed] });
	},
};
