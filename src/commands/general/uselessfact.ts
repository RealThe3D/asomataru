import { Colors, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import axios from 'axios';
import { Command } from '@/interfaces/Command.ts';

export const command: Command = {
	name: 'uselessfact',
	ownerOnly: false,
	cooldown: 3,
	usage: 'uselessfact',
	data: new SlashCommandBuilder()
		.setName('uselessfact')
		.setDescription('Sends a utterly, useless fact.'),
	execute: async (_, interaction) => {
		await interaction.deferReply();
		const { data } = await axios.get(
			'https://uselessfacts.jsph.pl/random.json?language=en',
		);

		const embed = new EmbedBuilder()
			.setColor(Colors.LuminousVividPink)
			.setTitle('Useless Fact!')
			.setDescription(data.text);

		await interaction.followUp({ embeds: [embed] });
	},
};
