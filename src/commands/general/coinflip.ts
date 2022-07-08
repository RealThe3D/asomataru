// TODO: Make it look nicer.
import { Command } from '../../interfaces/Command';
import { MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

export const command: Command = {
	name: 'coinflip',
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'coinflip',
	data: new SlashCommandBuilder().setName('coinflip').setDescription('Flip a coin.'),
	execute: async (client, interaction) => {
		
		const choices = ['on heads!', 'on tails!'];
		const coinResult = choices[Math.floor(Math.random() * choices.length)];
		const embed = new MessageEmbed()
			.setTitle(`${interaction.user.username} flipped a coin!`)
			.addField('Result: ', 'You have landed '+ coinResult, false);

		await interaction.reply({ embeds: [embed] });
	},
};
