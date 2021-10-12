import { Command } from '../../interfaces/Command';
import { MessageEmbed } from 'discord.js';
export const command: Command = {
	name: 'botstats',
	aliases: ['bs'],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 10,
	usage: '',
	execute: (client, message, args) => {
		const embed = new MessageEmbed()
			.setTitle(`Asomataru's Bot Stats`)
			.addField('Guilds', `${client.guilds.cache.size} Guilds`, false)
			.addField('Users', `${client.users.cache.size} Users`, false);

		message.channel.send({ embeds: [embed] });
	},
};
