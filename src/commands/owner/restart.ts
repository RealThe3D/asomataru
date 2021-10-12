import { Command } from '../../interfaces/Command';
import { MessageEmbed } from 'discord.js';

export const command: Command = {
	name: 'restart',
	aliases: [],
	permissions: [],
	ownerOnly: true,
	enabled: true,
	cooldown: 10,
	usage: 'restart',
	execute: async (client, message, args) => {
		const embed = new MessageEmbed()
			.setTitle('Restarting!')
			.setDescription("I'll restart...")
			.setTimestamp(new Date());

		message.channel.send({ embeds: [embed] });
		setTimeout(() => {
			process.exit(0);
		}, 5000);
	},
};
