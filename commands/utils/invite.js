module.exports = {
	name: 'invite',
	aliases: [],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 10,
	usage: 'invite',
	exec: async (client, message, args) => {
		const Discord = require('discord.js');

		const embed = new Discord.MessageEmbed()
			.setTitle("Asomataru's support server!")
			.setDescription(
				'Join the support server! https://discord.gg/vRPgqtb'
			);
		message.channel.send(embed);
	},
};
