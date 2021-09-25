const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'version',
	aliases: [],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'version',
	exec: async (client, message, args) => {
		const package = require('../../package.json');
		const version = package.version;
		const embed = new MessageEmbed()
			.setColor('006400')
			.setTitle('Asomataru!')
			.setDescription(`I'm on version ${version}`)
			.setFooter('Made by The3D#1120.');
		message.channel.send(embed);
	},
};
