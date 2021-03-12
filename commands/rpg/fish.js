module.exports = {
	name: 'fish',
	aliases: [],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 300,
	exec: async (client, message, args) => {
		const fishNames = ['bass', 'salmon', 'eel', 'pufferfish'];
		var fishRNG = fishNames[Math.floor(Math.random() * fishNames.length)];

		// MongoDB Scripts
		const User = require('../../models/userModel.js');
		// Check for data
		let data = await User.findOne({ userID: message.author.id });

		if (!data) {
			message.channel.send(
				"You've have not registered yet, please use a!profile"
			);
		} else {
			switch (fishNames) {
				case 'salmon':
					message.channel.send(
						`${message.author.username} has a caught a salmon!`
					);
					data.fish.salmon += 1;
					break;
				case 'bass':
					message.channel.send(
						`${message.author.username} has caught a bass!`
					);
					data.fish.bass += 1;
					break;
				case 'eel':
					message.channel.send(
						`${message.author.username} has caught an eel!`
					);
					data.fish.eel += 1;
					break;
				case 'pufferfish':
					message.channel.send(
						`${message.author.username} has a caught a pufferfish!`
					);
					data.fish.pufferfish += 1;
			}
			data.save();
		}
	},
};
