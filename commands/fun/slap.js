module.exports = {
	name: 'slap',
	aliases: [],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 3,
	usage: 'slap (@mention or userID)',
	exec: async (client, message, args) => {
		const User = require('../../models/userModel');
		const { MessageEmbed } = require('discord.js');
		const axios = require('axios');
		const member = message.mentions.users.first() || message.member;
		const embed = new MessageEmbed().setColor('RED');

		let userData = await User.findOne({ userID: message.author.id });

		if (!userData) {
			return message.channel.send('No data on you! Use a!profile');
		}
		let { data } = await axios.get('https://nekos.life/api/v2/img/slap');

		if (member.id == message.author.id) {
			embed.setTitle(`They... slapped themselves?`);
		} else {
			embed.setTitle(`${message.author.username} slapped ${member.username}!`);
			userData.affection -= 5;
			userData.save();
			embed.setFooter(
				`That's mean!!! ._. , You lost 5 affection, you now have ${userData.affection} Affection...`
			);
		}
		embed.setImage(data.url);

		message.channel.send(embed);
	},
};
