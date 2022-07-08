import { Command } from '../../interfaces/Command';
import { MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

export const command: Command = {
	name: 'restart',
	permissions: [],
	ownerOnly: true,
	enabled: true,
	cooldown: 10,
	usage: 'restart',
	data: new SlashCommandBuilder().setName('restart').setDescription('restarts the bot'),
	execute: async (client, interaction) => {
		const embed = new MessageEmbed()
			.setTitle('Restarting!')
			.setDescription('I\'ll restart...')
			.setTimestamp(new Date());

		interaction.reply({ embeds: [embed] });
		setTimeout(() => {
			process.exit(0);
		}, 5000);
	},
};
