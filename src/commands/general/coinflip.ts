// TODO: Make it look nicer.
import { Command } from '../../interfaces/Command';
import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export const command: Command = {
	name: 'coinflip',
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'coinflip',
	data: new SlashCommandBuilder()
		.setName('coinflip')
		.setDescription('Flip a coin.'),
	execute: async (client, interaction) => {
		const choices = ['on heads!', 'on tails!'];
		const coinResult = choices[Math.floor(Math.random() * choices.length)];
		const embed = new EmbedBuilder()
			.setTitle(`${interaction.user.username} flipped a coin!`)
			.addFields({
				name: 'Result: ',
				value: 'You have landed ' + coinResult,
				inline: false,
			});

		await interaction.reply({ embeds: [embed] });
	},
};
