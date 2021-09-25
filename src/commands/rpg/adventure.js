module.exports = {
	name: 'adventure',
	aliases: ['adv'],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 60,
	usage: 'adventure',
	exec: async (client, message, args) => {
		const User = require('../../models/userModel.js');
		const Discord = require('discord.js');

		let randomAmount = Math.floor(Math.random() * Math.floor(25)); // 1-25
		let randomXP = Math.floor(Math.random() * Math.floor(12)); // 1 - 12

		let data = await User.findOne({ userID: message.author.id });

		if (!data) {
			return message.channel.send(
				'Please use the profile command to register for the bot.'
			);
		}
		const embed = new Discord.MessageEmbed()
			.setTitle(
				`${message.author.username} traveled and did some bounties!`
			)
			.setDescription(
				`${message.author.username} has earned ${randomAmount} credits. You also gained ${randomXP} XP!`
			)
			.setFooter('Asomataru RPG System v0.2 Beta!');

		message.channel.send(embed);

		data.coins = data.coins + randomAmount;
		data.xp = data.xp + randomXP;
		data.save();
	},
};
