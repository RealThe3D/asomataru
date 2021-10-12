import { MessageEmbed } from 'discord.js';
import { Command } from '../../interfaces/Command';
import { modelSchema as User } from '../../models/userModel';
export const command: Command = {
	name: 'daily',
	aliases: [],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 86400,
	usage: 'daily',
	execute: async (client, message, args) => {
		let randomAmount = Math.floor(Math.random() * Math.floor(750)); // 1-750
		let data = await User.findOne({ userID: message.author.id });

		if (!data) {
			message.channel.send(
				`You've have not registered yet, please use a!profile`
			);
		} else {
			data.coins += randomAmount;

			const embed = new MessageEmbed()
				.setColor('GREEN')
				.setTitle(`${message.author.username}'s Daily Rewards`)
				.setDescription(`Your daily reward is ${randomAmount} coins!`);
			message.channel.send({ embeds: [embed] });
			data.save();
		}
	},
};
