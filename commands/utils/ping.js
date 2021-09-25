const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'ping',
	aliases: [],
	permissions: [],
	enabled: true,
	cooldown: 3,
	exec: async (client, message, args) => {
		const package = require('../../package.json');
		const version = package.version;
		const ping = new MessageEmbed()
			.setTitle('Ping')
			.setDescription(`Ping?`)
			.setColor(0xdff8eb)
			.setFooter(`Version ${version}`);
		const m = await message.channel.send(ping);
		const pong = new MessageEmbed()
			.setTitle('Ping')
			.setDescription(
				`Pong! Latency is ${
					m.createdTimestamp - message.createdTimestamp
				}ms. 🏓`
			)
			.setColor(0xdff8eb)
			.setFooter(`Version ${version}`);
		m.edit(pong);
	},
};
