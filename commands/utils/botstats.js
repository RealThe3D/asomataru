module.exports = {
	name: 'botstats',
	aliases: ['bs'],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 10,
	exec: async (client, message, args) => {
		const Discord = require('discord.js');
		const stats = [
			`**Guilds: ${client.guilds.cache.size} Guilds**`,
			`**Members: ${client.members.cache.size} Members**`,
		];
		const botstats = new Discord.MessageEmbed()
			.setTitle(`Asomataru's Bot Stats`)
			.setDescription(stats)
			.setFooter('MAY BE OUTDATED!');
		message.channel.send(botstats);
	},
};
