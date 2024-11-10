import { Colors, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { Command } from '@/interfaces/Command.ts';

export const command: Command = {
	name: 'ping',
	cooldown: 3,
	ownerOnly: false,
	usage: '',
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with the latency with milliseconds'),
	execute: async (_, interaction) => {
		await interaction.deferReply();

		const initEmbed = new EmbedBuilder()
			.setTitle('Pong?')
			.setDescription('Pinging the bot....')
			.setColor(Colors.Grey);

		const newInteraction = await interaction.followUp({ embeds: [initEmbed] });

		initEmbed
			.setTitle('Pong!')
			.setDescription(
				`The latency is ${
					newInteraction.createdTimestamp - interaction.createdTimestamp
				}ms. 🏓`,
			)
			.setColor(Colors.Green);

		await newInteraction.edit({
			embeds: [initEmbed],
		});
	},
};
