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

		let randomNum = Math.floor(Math.random() * 10) + 1;
		let randomNum2 = Math.floor(Math.random() * 10) + 1;

		if (!isNaN(args[0]) && userData.bj == 0) {
			userData.betAmount = args[0];
		}

		if (!args[0] == 'stand') {
			userData.bj += randomNum;
		}

		userData.enemyBj += randomNum2;

		const embed = new MessageEmbed()
			.setTitle('Blackjack')
			.addField('Your stand', userData.bj, false)
			.addField('Enemy stand', userData.enemyBj, false);

		message.channel.send(embed);

		if (args[0] == 'stand') {
			if (userData.bj > userData.enemyBj && userData.bj <= 21) {
				return message.channel.send('You win');
			} else if (userData.bj < userData.enemyBj && userData.enemyBj <= 21) {
				return message.channel.send('You lose!');
			}
		}

		if (userData.bj > 21) {
			message.channel.send('You lose.');
			userData.bj = 0;
			userData.enemyBj = 0;
			userData.coins -= userData.betAmount;
			userData.betAmount = 0;
		} else if (userData.enemyBj > 21) {
			message.channel.send('You win!');
			userData.bj = 0;
			userData.enemyBj = 0;
			userData.coins += userData.betAmount;
			userData.betAmount = 0;
		}
		userData.save();
	},
};
