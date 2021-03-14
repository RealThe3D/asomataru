module.exports = {
	name: 'daily',
	aliases: [],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 86400,
	usage: 'daily',
	exec: async (client, message, args) => {
		const User = require('../../models/userModel.js');
		const Discord = require('discord.js');
		let randomAmount = Math.floor(Math.random() * Math.floor(750)); // 1-750
		let data = await User.findOne({ userID: message.author.id });

		if (!data) {
			message.channel.send(
				`You've have not registered yet, please use a!profile`
			);
		} else {
			data.coins += randomAmount;

			const embed = new Discord.MessageEmbed()
				.setTitle(`${message.author.username}'s Daily Rewards`)
				.setDescription(`Your daily reward is ${randomAmount} coins!`);
			message.channel.send(embed);
			data.save();
		}
	},
};
