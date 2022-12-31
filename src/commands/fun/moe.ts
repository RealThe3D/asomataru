import { Command } from '../../interfaces/Command';
import {
	EmbedBuilder,
	SlashCommandBuilder,
	bold,
	underscore,
} from 'discord.js';
import axios from 'axios';

export const command: Command = {
	name: 'moemorphism',
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'moemorphism',
	data: new SlashCommandBuilder()
		.setName('moemorphism')
		.setDescription('Sends an random moemorphism of something'),
	execute: async (client, interaction) => {
		const { data } = await axios.get(
			'https://meme-api.herokuapp.com/gimme/moemorphism'
		);

		const embed = new EmbedBuilder()
			.setImage(data.url)
			.setTitle(bold(underscore('Moemorphism')))
			.setURL(`https://reddit.com/r/${data.subreddit}`)
			.setFooter({ text: `From r/${data.subreddit}` });

		await interaction.reply({ embeds: [embed] });
	},
};
