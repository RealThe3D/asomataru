const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
	name: 'feed',
	aliases: ['nom'],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 3,
	usage: 'feed (@mention or userID)',
	exec: async (client, message, args) => {
		const User = require('../../models/userModel');
		const member = message.mentions.users.first() || message.member;
		const embed = new MessageEmbed().setColor('#FFB6C1');

		let userData = await User.findOne({ userID: message.author.id });

		if (!userData) {
			return message.channel.send('No data on you! Use a!profile');
		}
		let { data } = await axios.get('https://nekos.life/api/v2/img/feed');

		if (member.id == message.author.id) {
			embed.setTitle(`They... fed themselves? Sharing is caring.`);
			userData.affection -= 1;
			embed.setFooter(`You lost 1 affection for being selfish >:(`);
		} else {
			embed.setTitle(`${message.author.username} had fed ${member.username}!`);
			userData.affection += 12;
			userData.save();
			embed.setFooter(
				`You've gained 12 affection for feeding someone! You now have ${userData.affection} Affection!`
			);
		}
		embed.setImage(data.url);

		message.channel.send(embed);
	},
};
