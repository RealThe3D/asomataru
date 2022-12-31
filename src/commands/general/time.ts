import { Command } from '../../interfaces/Command';
import { SlashCommandBuilder, time } from 'discord.js';

export const command: Command = {
	name: 'time',
	cooldown: 10,
	enabled: true,
	ownerOnly: false,
	permissions: [],
	usage: 'a!time',
	data: new SlashCommandBuilder()
		.setName('time')
		.setDescription('Shows what time it is'),
	execute: async (client, interaction) => {
		await interaction.reply(`It is currently ${time(new Date())}`);
	},
};
