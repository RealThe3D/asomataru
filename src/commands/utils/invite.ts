import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';
import { Command } from '../../interfaces/Command';

export const command: Command = {
	name: 'invite',
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 10,
	usage: 'invite',
	data: new SlashCommandBuilder().setName('invite').setDescription('Sends an invite to the support server!'),
	execute: async (client, interaction) => {
		const embed = new MessageEmbed()
			.setTitle('Asomataru\'s support server!')
			.addField(
				'Support Server!',
				'Join the support server! https://discord.gg/vRPgqtb',
				false
			);

		await interaction.reply({ embeds: [embed] });
	},
};
