import { MessageEmbed } from 'discord.js';
import { Command } from '../../interfaces/Command';
import * as PACKAGE from '../../../package.json';
import { SlashCommandBuilder } from '@discordjs/builders';

export const command: Command = {
	name: 'ping',
	permissions: [],
	cooldown: 3,
	enabled: true,
	ownerOnly: false,
	usage: '',
	data: new SlashCommandBuilder().setName('ping').setDescription('Replies with pong with milliseconds'),
	execute: async (client, interaction) => {
		const ping = new MessageEmbed()
			.setTitle('Ping')
			.setDescription('Ping?')
			.setColor(0xdff8eb)
			.setFooter(`Asomataru v${PACKAGE.version}`);
		await interaction.reply({embeds: [ping]});

		// const m = await interaction.channel?.send({embeds: [ping]}) as Message;
		const pong = new MessageEmbed()
			.setTitle('Ping')
			.setDescription(
				'Pong!'
				//  Latency is ${
				// 	interaction.createdTimestamp - interaction.
				// }ms. 🏓`
			)
			.setColor(0xdff8eb)
			.setFooter(`Asomataru v${PACKAGE.version}`);
		await interaction.editReply({embeds: [pong]});
	},
};
