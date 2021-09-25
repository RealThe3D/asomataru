const { MessageEmbed } = require('discord.js');
const axios = require('axios');
module.exports = {
	name: 'poke',
	aliases: [],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 3,
	usage: 'poke (@mention or userID)',
	exec: async (client, message, args) => {
		const User = require('../../models/userModel');

		const member = message.mentions.users.first() || message.member;
		const embed = new MessageEmbed().setColor('#FFB6C1');

		let userData = await User.findOne({ userID: message.author.id });

		if (!userData) {
			return message.channel.send('No data on you! Use a!profile');
		}
		let { data } = await axios.get('https://nekos.life/api/v2/img/poke');

		if (member.id == message.author.id) {
			embed.setTitle(`They... poked themselves?`);
		} else {
			embed.setTitle(`${message.author.username} poked ${member.username}...`);
			userData.affection += 2;
			userData.save();
			embed.setFooter(
				`You've gained 2 affection for poking someone? You now have ${userData.affection} Affection!`
			);
		}
		embed.setImage(data.url);

		message.channel.send(embed);
	},
};
