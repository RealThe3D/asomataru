import {
	EmbedBuilder,
	SlashCommandBuilder,
	bold,
	underscore,
} from 'discord.js';
import axios from 'axios';
import { Command } from '../../interfaces/Command';

export const command: Command = {
	name: 'dog',

	ownerOnly: false,

	cooldown: 3,
	usage: 'dog',
	data: new SlashCommandBuilder()
		.setName('dog')
		.setDescription('Displays a picture of a dog'),
	execute: async (client, interaction) => {
		const { data } = await axios.get('https://random.dog/woof.json');

		const embed = new EmbedBuilder()
			.setTitle(bold(underscore('Who is a good doggo!'))) //`**____**`)
			.setImage(data.url)
			.setFooter({ text: 'Powered by random.dog API' });

		await interaction.reply({ embeds: [embed] });
	},
};
