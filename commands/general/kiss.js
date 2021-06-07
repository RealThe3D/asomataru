module.exports = {
	name: 'kiss',
	aliases: [],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 3,
	usage: 'kiss (@mention or userID)',
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
		let { body } = await axios.get('https://nekos.life/api/v2/img/kiss');

		if (member.id == message.author.id) {
			embed.setTitle(`They... kissed themselves?`);
		} else {
			embed.setTitle(
				`${message.author.username} kissed ${member.username}!`
			);
			userData.affection += 5;
			userData.save();
			embed.setFooter(
				`You've gained 5 affection for being generous! You now have ${userData.affection} Affection!`
			);
		}
		embed.setImage(body.url);

		message.channel.send(embed);
	},
};
