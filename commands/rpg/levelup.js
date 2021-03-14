module.exports = {
	name: 'levelup',
	aliases: ['rankup'],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'levelup',
	exec: async (client, message, args) => {
		const User = require('../../models/userModel.js');
		const Discord = require('discord.js');
		let data = await User.findOne({ userID: message.author.id });

		if (!data) {
			return message.channel.send(
				'Please use the profile command to register for the bot.'
			);
		}
		if (data.xp > data.xptoNextLevel) {
			const embed = new Discord.MessageEmbed()
				.setTitle('You have leveled up!')
				.setDescription(`You are now level ${data.level + 1}!`);
			message.channel.send(embed);
			data.level = data.level + 1;
			data.xptoNextLevel =
				(6 * data.xptoNextLevel) ^ (2 + 80 * data.xptoNextLevel + 100);
			data.xp = 0;
			data.save();
		} else {
			message.channel.send('Not enough XP.');
		}
	},
};
