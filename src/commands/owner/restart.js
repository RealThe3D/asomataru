const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'restart',
	aliases: [],
	permissions: [],
	ownerOnly: true,
	enabled: true,
	cooldown: 10,
	usage: 'restart',
	exec: async (client, message, args) => {
		const embed = new MessageEmbed()
			.setTitle('Restarting!')
			.setDescription("I'll restart...")
			.setTimestamp(new Date());

		message.channel.send(embed);
		setTimeout(() => {
			process.exit(0);
		}, 5000);
	},
};
