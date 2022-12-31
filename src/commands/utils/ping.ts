import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { Command } from '../../interfaces/Command';
import * as PACKAGE from '../../../package.json';

export const command: Command = {
	name: 'ping',
	permissions: [],
	cooldown: 3,
	enabled: true,
	ownerOnly: false,
	usage: '',
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with pong with milliseconds'),
	execute: async (client, interaction) => {
		const ping = new EmbedBuilder()
			.setTitle('Ping')
			.setDescription('Ping?')
			.setColor(0xdff8eb)
			.setFooter({ text: `Asomataru v${PACKAGE.version}` });
		await interaction.reply({ embeds: [ping] });

		const m = await interaction.channel?.send({ embeds: [ping] });
		const pong = new EmbedBuilder()
			.setTitle('Ping')
			.setDescription(
				'Pong!' +
					`Latency is ${
						interaction.createdTimestamp - m?.createdTimestamp!
					}ms. 🏓`
			)
			.setColor(0xdff8eb)
			.setFooter({ text: `Asomataru v${PACKAGE.version}` });
		await interaction.editReply({ embeds: [pong] });
	},
};
