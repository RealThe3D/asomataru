import { MessageEmbed } from 'discord.js';
import { Command } from '../../interfaces/Command';
import * as PACKAGE from '../../../package.json';

export const command: Command = {
	name: 'ping',
	aliases: ['p'],
	permissions: [],
	cooldown: 3,
	enabled: true,
	ownerOnly: false,
	usage: '',
	execute: async (client, message, args) => {
		const ping = new MessageEmbed()
			.setTitle('Ping')
			.setDescription(`Ping?`)
			.setColor(0xdff8eb)
			.setFooter(`Asomataru v${PACKAGE.version}`);
		const m = await message.channel.send({ embeds: [ping] });
		const pong = new MessageEmbed()
			.setTitle('Ping')
			.setDescription(
				`Pong! Latency is ${
					m.createdTimestamp - message.createdTimestamp
				}ms. 🏓`
			)
			.setColor(0xdff8eb)
			.setFooter(`Asomataru v${PACKAGE.version}`);
		m.edit({ embeds: [pong] });
	},
};
