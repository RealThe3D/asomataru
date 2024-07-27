import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import axios from 'axios';
import { Command } from '../../interfaces/Command';
import { randomIndexOfArray } from '../../constants';
import { IMemes } from '../../declarations/memes';

export const command: Command = {
	name: 'bird',
	ownerOnly: false,
	cooldown: 3,
	usage: 'bird',
	data: new SlashCommandBuilder()
		.setName('bird')
		.setDescription('Displays an image of a bird.'),
	execute: async (client, interaction) => {
		await interaction.deferReply();
		const { data } = await axios.get(
			'https://www.reddit.com/r/birding/top.json?sort=top&t=day&limit=100'
		);
		const randomMemeData = randomIndexOfArray<IMemes>(data.data.children).data;
		const embed = new EmbedBuilder()
			.setTitle(randomMemeData.title)
			.setImage(randomMemeData.url)
			.setFields([
				{
					name: 'Votes',
					value: `${randomMemeData.ups} / ${randomMemeData.downs}`,
					inline: false,
				},
			])
			.setURL(`https://www.reddit.com${randomMemeData.permalink}`);

		// await interaction.reply({ embeds: [embed] });
		// const embed = new EmbedBuilder()
		// 	.setTitle(bold(underscore('Here is a bird! Soar my little friend!'))) //`**Here is a bird! Soar my little friend!**`)
		// 	.setImage(data.url)
		// 	.setFooter({ text: 'From Reddit' });

		await interaction.followUp({ embeds: [embed] });
	},
};
