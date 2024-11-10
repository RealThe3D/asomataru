import { Command } from '@/interfaces/Command.ts';
import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import axios from 'axios';
import { randomIndexOfArray } from '@/constants/index.ts';
import { selectRandomColor } from '@/constants/randomColors.ts';
import { IMemes } from '@/declarations/memes.ts';

export const command: Command = {
	name: 'moemorphism',
	ownerOnly: false,
	cooldown: 0,
	usage: 'moemorphism',
	data: new SlashCommandBuilder()
		.setName('moemorphism')
		.setDescription('Sends an random moemorphism of something'),
	execute: async (_, interaction) => {
		await interaction.deferReply();
		const { data } = await axios.get(
			'https://www.reddit.com/r/moemorphism/top.json?sort=top&t=day&limit=100',
		);

		const randomMemeData = randomIndexOfArray<IMemes>(data.data.children).data;

		const embed = new EmbedBuilder()
			.setTitle(randomMemeData.title)
			.setImage(randomMemeData.url)
			.setColor(selectRandomColor())
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
