import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { Command } from '../../interfaces/Command';

export const command: Command = {
	name: 'invite',

	ownerOnly: false,

	cooldown: 10,
	usage: 'invite',
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Sends an invite to the support server!'),
	execute: async (client, interaction) => {
		const embed = new EmbedBuilder()
			.setTitle("Asomataru's support server!")
			.setFields([
				{
					name: 'Support Server',
					value: 'Join the support server! https://discord.gg/vRPgqtb',
					inline: false,
				},
			]);

		await interaction.reply({ embeds: [embed] });
	},
};
