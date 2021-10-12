import { MessageEmbed } from 'discord.js';
import { Command } from '../../interfaces/Command';

export const command: Command = {
	name: 'invite',
	aliases: [],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 10,
	usage: 'invite',
	execute: async (client, message, args) => {
		const embed = new MessageEmbed()
			.setTitle("Asomataru's support server!")
			.addField(
				'Support Server!',
				'Join the support server! https://discord.gg/vRPgqtb',
				false
			);

		message.channel.send({ embeds: [embed] });
	},
};
