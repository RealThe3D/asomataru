import { MessageEmbed } from 'discord.js';
import axios from 'axios';
import { modelSchema as User } from '../../models/userModel';
import { Command } from '../../interfaces/Command';

export const command: Command = {
	name: 'feed',
	aliases: ['nom'],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 3,
	usage: 'feed (@mention or userID)',
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

		const embed = new MessageEmbed().setColor('#FFB6C1');

		let userData = await User.findOne({ userID: message.author.id });

		if (!userData) {
			return message.channel.send('No data on you! Use a!profile');
		}
		let { data } = await axios.get('https://nekos.life/api/v2/img/feed');

		if (user.id == message.author.id) {
			embed.setTitle(`They... fed themselves? Sharing is caring.`);
			userData.affection -= 1;
			embed.setFooter(`You lost 1 affection for being selfish >:(`);
		} else {
			embed.setTitle(
				`${message.author.username} had fed ${user.user.username}!`
			);
			userData.affection += 12;
			userData.save();
			embed.setFooter(
				`You've gained 12 affection for feeding someone! You now have ${userData.affection} Affection!`
			);
		}
		embed.setImage(data.url);

		message.channel.send({ embeds: [embed] });
	},
};
