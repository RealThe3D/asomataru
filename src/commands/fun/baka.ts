import { MessageEmbed } from 'discord.js';
import { Command } from '../../interfaces/Command';
import axios from 'axios';
import { modelSchema as User } from '../../models/userModel';

export const command: Command = {
	name: 'baka',
	aliases: ['idiot'],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'baka (@mention)',
	execute: async (client, message, args) => {
		const embed = new MessageEmbed();
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

		let userData = await User.findOne({ userID: message.author.id });

		if (!userData) {
			return message.channel.send('No data about you, use a!profile!');
		}

		let { data } = await axios.get('https://nekos.life/api/v2/img/baka');

		if (user.id == message.author.id) {
			embed.setTitle(`They're calling themselves... a baka?`);
		} else {
			embed.setTitle(`${user.user.tag} is a baka!`);
			userData.affection -= 5;
			userData.save();
			embed.setFooter(
				`You've loss 5 affection for being mean! You now have ${userData.affection} Affection.`
			);
		}
		embed.setColor('RED');
		embed.setImage(data.url);
		message.channel.send({ embeds: [embed] });
	},
};
