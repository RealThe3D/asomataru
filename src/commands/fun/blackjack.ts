import { MessageEmbed } from 'discord.js';
import { Command } from '../../interfaces/Command';
import { modelSchema as User } from '../../models/userModel';

export const command: Command = {
	name: 'blackjack', // set command name
	aliases: ['bj'], // set command aliases
	permissions: [], // set command permissions
	ownerOnly: true, // set true if command is owner only
	enabled: true, // set true if command enabled
	cooldown: 2, // in seconds
	usage: '', // usage of command
	execute: async (client, message, args) => {
		let userData = await User.findOne({ userID: message.author.id });

		if (!userData) {
			return message.channel.send('Please use a!profile.');
		}

		let randomNum = Math.floor(Math.random() * 10) + 1;
		let randomNum2 = Math.floor(Math.random() * 10) + 1;

		if (args[0] && userData.bj == 0) {
			if (args[0] > userData.coins) {
				return message.channel.send(`You can't bet more than what you have!`);
			}
			userData.betAmount = args[0];
		}

		if (args[0] == 'hit') {
			userData.bj += randomNum;
			userData.enemyBj += randomNum2;
		} else if (args[0] == 'stand') {
			userData.enemyBj += randomNum2;
		}

		const embed = new MessageEmbed()
			.setTitle('Blackjack')
			.setColor('WHITE')
			.addField('Your stand', userData.bj, false)
			.addField('Enemy stand', userData.enemyBj, false);

		message.channel.send({ embeds: [embed] });

		if (args[0] == 'stand') {
			if (userData.bj > userData.enemyBj && userData.bj <= 21) {
				userData.bj = 0;
				userData.enemyBj = 0;
				userData.coins += userData.betAmount;
				userData.betAmount = 0;
				userData.save();
				return message.channel.send('You win');
			} else if (userData.bj < userData.enemyBj && userData.enemyBj <= 21) {
				userData.bj = 0;
				userData.enemyBj = 0;
				userData.coins -= userData.betAmount;
				userData.betAmount = 0;
				userData.save();
				return message.channel.send('You lose!');
			} else if (
				(userData.bj == 21 && userData.enemyBj == 21) ||
				userData.bj == userData.enemyBj
			) {
				userData.bj = 0;
				userData.enemyBj = 0;
				userData.betAmount = 0;
				userData.save();
				return message.channel.send('You tied! No coins lost.');
			}
		}

		if (userData.bj > 21 || userData.enemyBj == 21) {
			message.channel.send('You lose.');
			userData.bj = 0;
			userData.enemyBj = 0;
			userData.coins -= userData.betAmount;
			userData.betAmount = 0;
		} else if (userData.enemyBj > 21 || userData.bj == 21) {
			message.channel.send('You win!');
			userData.bj = 0;
			userData.enemyBj = 0;
			userData.coins += userData.betAmount;
			userData.betAmount = 0;
		} else if (userData.bj == 21 && userData.enemyBj == 21) {
			userData.bj = 0;
			userData.enemyBj = 0;
			userData.betAmount = 0;
			message.channel.send('You tied! No coins lost.');
		}

		userData.save();
	},
};