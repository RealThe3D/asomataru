import {
	EmbedBuilder,
	SlashCommandBuilder,
	bold,
	underscore,
} from 'discord.js';
import axios from 'axios';
import { Command } from '../../interfaces/Command';
import { selectRandomColor } from '../../constants/randomColors';

export const command: Command = {
	name: 'dog',
	ownerOnly: false,
	cooldown: 3,
	usage: 'dog',
	data: new SlashCommandBuilder()
		.setName('dog')
		.setDescription('Displays a picture of a dog'),
	execute: async (client, interaction) => {
		await interaction.deferReply();
		const { data } = await axios.get('https://random.dog/woof.json');

		const embed = new EmbedBuilder()
			.setTitle(bold(underscore('Who is a good doggo!'))) //`**____**`)
			.setImage(data.url)
			.setColor(selectRandomColor())
			.setFooter({ text: 'Powered by random.dog API' });

		await interaction.followUp({ embeds: [embed] });
	},
};
