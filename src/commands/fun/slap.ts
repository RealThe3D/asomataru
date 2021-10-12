import { MessageEmbed } from 'discord.js';
import axios from 'axios';
import { Command } from '../../interfaces/Command';
import { modelSchema as User } from '../../models/userModel';

export const command: Command = {
	name: 'slap',
	aliases: [],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 3,
	usage: 'slap (@mention or userID)',
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
		const embed = new MessageEmbed().setColor('RED');

		let userData = await User.findOne({ userID: user.id });

		if (!userData) {
			return message.channel.send('No data on you! Use a!profile');
		}
		let { data } = await axios.get('https://nekos.life/api/v2/img/slap');

		if (user.id == message.author.id) {
			embed.setTitle(`They... slapped themselves?`);
		} else {
			embed.setTitle(
				`${message.author.username} slapped ${user.user.username}!`
			);
			userData.affection -= 5;
			userData.save();
			embed.setFooter(
				`That's mean!!! ._. , You lost 5 affection, you now have ${userData.affection} Affection...`
			);
		}
		embed.setImage(data.url);

		message.channel.send({ embeds: [embed] });
	},
};
