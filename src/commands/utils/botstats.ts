import { Command } from '../../interfaces/Command';
import { MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
export const command: Command = {
	name: 'botstats',
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 10,
	usage: '',
	data: new SlashCommandBuilder().setName('botstats').setDescription('Display\'s Asomataru\'s stats.'),
	execute: async(client, interaction) => {
		const embed = new MessageEmbed()
			.setTitle('Asomataru\'s Bot Stats')
			.addField('Guilds', `${client.guilds.cache.size} Guilds`, false)
			.addField('Users', `${client.users.cache.size} Users`, false);

		await interaction.reply({ embeds: [embed] });
	},
};
