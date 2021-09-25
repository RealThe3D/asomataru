module.exports = {
	name: 'hug',
	aliases: [],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 3,
	usage: 'hug (@mention or userID)',
	exec: async (client, message, args) => {
		const User = require('../../models/userModel');
		const { MessageEmbed } = require('discord.js');
		const axios = require('axios');
		const member = message.mentions.users.first() || message.member;
		const embed = new MessageEmbed().setColor('#FFB6C1');

		let userData = await User.findOne({ userID: message.author.id });

		if (!userData) {
			return message.channel.send('No data on you! Use a!profile');
		}
		let { data } = await axios.get('https://nekos.life/api/v2/img/hug');

		if (member.id == message.author.id) {
			embed.setTitle(`They... hugged themselves?`);
		} else {
			embed.setTitle(`${message.author.username} hugged ${member.username}!`);
			userData.affection += 10;
			userData.save();
			embed.setFooter(
				`You've gained 10 affection for being generous! You now have ${userData.affection} Affection!`
			);
		}
		embed.setImage(data.url);

		message.channel.send(embed);
	},
};
