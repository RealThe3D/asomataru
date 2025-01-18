import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	Colors,
	EmbedBuilder,
	SlashCommandBuilder,
} from 'discord.js';
import { Command } from '@/interfaces/Command.ts';

export const command: Command = {
	name: 'github',
	ownerOnly: false,
	cooldown: 10,
	usage: 'github',
	data: new SlashCommandBuilder()
		.setName('github')
		.setDescription("Sends a link to Asomtaru's GitHub repository."),
	execute: async (_, interaction) => {
		const button = new ActionRowBuilder<ButtonBuilder>().addComponents([
			new ButtonBuilder()
				.setLabel('GitHub')
				.setURL('https://github.com/RealThe3D/asomataru')
				.setStyle(ButtonStyle.Link),
		]);
		const embed = new EmbedBuilder()
			.setTitle("Asomataru's GitHub Repository")
			.setDescription('Feel free to contribute!')
			.setColor(Colors.Blurple);

		await interaction.reply({ embeds: [embed], components: [button] });
	},
};
