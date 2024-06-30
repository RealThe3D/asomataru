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
	name: 'cat',
	ownerOnly: false,
	cooldown: 0,
	usage: 'cat',
	data: new SlashCommandBuilder()
		.setName('cat')
		.setDescription('Displays an image of a cat'),
	execute: async (client, interaction) => {
		await interaction.deferReply();
		const { data } = await axios.get('http://aws.random.cat/meow');

		const embed = new EmbedBuilder()
			.setTitle(bold(underscore('Who is a good cuddly kitten!')))
			.setImage(data.file)
			.setColor(selectRandomColor())
			.setFooter({ text: 'Powered by aws.random.cat API' });

		await interaction.followUp({ embeds: [embed] });
	},
};
