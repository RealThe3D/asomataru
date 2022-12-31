import { Command } from '../../interfaces/Command';
import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import axios from 'axios';

export const command: Command = {
	name: 'joke',
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 3,
	usage: 'joke',
	data: new SlashCommandBuilder()
		.setName('joke')
		.setDescription('Sends a joke in chat'),
	execute: async (client, interaction) => {
		const { data } = await axios.get(
			'https://v2.jokeapi.dev/joke/Any?safe-mode&type=single'
		);

		const embed = new EmbedBuilder()
			.setTitle('A joke for you!')
			.setDescription(data.joke)
			.setFooter({ text: 'Powered by JokeAPI' });

		await interaction.reply({ embeds: [embed] });
	},
};
