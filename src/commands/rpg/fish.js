const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'fish',
	aliases: [],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 300,
	usage: 'fish',
	exec: async (client, message, args) => {
		const fishNames = ['bass', 'salmon', 'eel', 'pufferfish'];
		const fishRNG = fishNames[Math.floor(Math.random() * fishNames.length)];
		var description;
		// MongoDB Scripts
		const User = require('../../models/userModel.js');
		// Check for data
		let data = await User.findOne({ userID: message.author.id });

		if (!data) {
			return message.channel.send(
				"You've have not registered yet, please use a!profile"
			);
		}
		switch (fishRNG) {
			case 'salmon':
				description = `${message.author.username} has a caught a salmon!`;
				data.fish.salmon += 1;
				break;
			case 'bass':
				description = `${message.author.username} has caught a bass!`;
				data.fish.bass += 1;
				break;
			case 'eel':
				description = `${message.author.username} has caught an eel!`;
				data.fish.eel += 1;
				break;
			case 'pufferfish':
				description = `${message.author.username} has a caught a pufferfish!`;
				data.fish.pufferfish += 1;
		}
		const embed = new Discord.MessageEmbed()
			.setTitle('What a catch!')
			.setDescription(description)
			.setFooter('Asomataru RPG v0.2 Beta!');

		message.channel.send(embed);
		data.save();
	},
};
