import axios from 'axios';
import { Command } from '../../interfaces/Command';
import { randomIndexOfArray } from '../../constants';
import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { IMemes } from '../../declarations/memes';

export const command: Command = {
	name: 'meme',
	ownerOnly: false,
	cooldown: 10,
	usage: 'a!meme',
	data: new SlashCommandBuilder()
		.setName('meme')
		.setDescription('Sends a meme into chat.'),
	execute: async (client, interaction) => {
		await interaction.deferReply();
		const { data } = await axios.get(
			'https://www.reddit.com/r/dankmemes/top.json?sort=top&t=day&limit=100'
		);

		const randomMemeData = randomIndexOfArray<IMemes>(data.data.children).data;

		const embed = new EmbedBuilder()
			.setTitle(randomMemeData.title)
			.setImage(randomMemeData.url)
			.setColor('Orange')
			.setFields([
				{
					name: 'Votes',
					value: `${randomMemeData.ups} / ${randomMemeData.downs}`,
					inline: false,
				},
			])
			.setURL(`https://www.reddit.com${randomMemeData.permalink}`);

		await interaction.followUp({ embeds: [embed] });
	},
};
