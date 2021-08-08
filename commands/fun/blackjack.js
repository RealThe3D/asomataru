const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'blackjack', // set command name
	aliases: ['bj'], // set command aliases
	permissions: [], // set command permissions
	ownerOnly: true, // set true if command is owner only
	enabled: true, // set true if command enabled
	cooldown: 5, // in seconds
	usage: '', // usage of command
	exec: async (client, message, args) => {
		const User = require('../../models/userModel');
		let userData = await User.findOne({ userID: message.author.id });

		if (!userData) {
			return message.channel.send('Please use a!profile.');
		}

		const embed = new MessageEmbed()
			.setTitle('Blackjack')
			.addField('Your stand', User.bj, false)
			.addField('Enemy stand', User.enemyBj, false);

		message.channel.send(embed);
		message.react('🎈');
	},
};
