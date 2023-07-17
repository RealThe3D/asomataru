import { SlashCommandBuilder, EmbedBuilder, Colors } from 'discord.js';
import axios from 'axios';
import { Command } from '../../interfaces/Command';

export const command: Command = {
	name: 'uselessfact',
	ownerOnly: false,
	cooldown: 3,
	usage: 'uselessfact',
	data: new SlashCommandBuilder()
		.setName('uselessfact')
		.setDescription('Sends a utterly, useless fact.'),
	execute: async (client, interaction) => {
		await interaction.deferReply();
		const { data } = await axios.get(
			'https://uselessfacts.jsph.pl/random.json?language=en'
		);

		const embed = new EmbedBuilder()
			.setColor(Colors.LuminousVividPink)
			.setTitle('USELESS FACT')
			.setDescription(data.text);

		await interaction.editReply({ embeds: [embed] });
	},
};
