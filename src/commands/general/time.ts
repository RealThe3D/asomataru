import { Command } from '@/interfaces/Command.ts';
import { SlashCommandBuilder, time } from 'discord.js';

export const command: Command = {
	name: 'time',
	cooldown: 10,
	ownerOnly: false,
	usage: 'time',
	data: new SlashCommandBuilder()
		.setName('time')
		.setDescription('Shows what time it is'),
	execute: async (_, interaction) => {
		await interaction.reply(`It is currently ${time()}`);
	},
};
