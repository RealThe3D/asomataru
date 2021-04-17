module.exports = {
	name: 'baka',
	aliases: ['idiot'],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'baka (@mention)',
	exec: async (client, message, args) => {
		const { MessageEmbed } = require('discord.js');
		const User = require('../../models/userModel');
		const superagent = require('superagent');
		const member = message.mentions.users.first() || message.member;
		const embed = new MessageEmbed();

		let userData = await User.findOne({ userID: message.author.id });

		if (!userData) {
			return message.channel.send('No data about you, use a!profile!');
		}

		let { body } = await superagent.get(
			'https://nekos.life/api/v2/img/baka'
		);

		if (member.id == message.author.id) {
			embed.setTitle(`**They are calling themselves.. a baka?`);
		} else {
			embed.setTitle(`**Here is a neko! UwU**`);
		}

		userData.affection -= 5;
		userData.save();

		embed.setImage(body.url);
		embed.setFooter(
			`You loss 5 affection for being mean! You now have ${userData.affection} Affection.`
		);

		message.channel.send(embed);
	},
};
