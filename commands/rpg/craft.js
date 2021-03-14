module.exports = {
	name: 'craft',
	aliases: [],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 10,
	usage: 'craft (item)',
	exec: async (client, message, args) => {
		const User = require('../../models/userModel.js');
		// Check for data
		let data = await User.findOne({ userID: message.author.id });

		if (!data) {
			return message.channel.send(
				"You've have not registered yet, please use a!profile"
			);
		}
		if (args[0] === '1') {
			if (data.resources.oakwood > 3) {
				message.channel.send('Test');
				data.save();
			} else {
			}
		}
	},
};
