module.exports = {
	name: 'quests',
	aliases: [''],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'quest',
	exec: async (client, message, args) => {
		const User = require('../../models/userModel.js');

		let data = await User.findOne({ userID: message.author.id });

		const Discord = require('discord.js');

		const embed = new Discord.MessageEmbed()
			.setTitle('Coming soon!')
			.setDescription('Update will come soon.');
		message.channel.send('Coming soon...');
	},
};
