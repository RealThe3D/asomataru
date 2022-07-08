import axios from 'axios';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Command } from '../../interfaces/Command';
import { randomIndexOfArray } from '../../constants';
import { MessageEmbed } from 'discord.js';

export const command: Command = {
	name: 'meme',
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 10,
	usage: 'a!meme',
	data: new SlashCommandBuilder().setName('meme').setDescription('Sends a meme into chat.'),
	execute: async (client, interaction) => {
		// await interaction.deferReply();
		const { data } = await axios.get('https://www.reddit.com/r/dankmemes/top.json?sort=top&t=day&limit=100');
		
		const randomMemeData = randomIndexOfArray(data.data.children).data;


		const embed = new MessageEmbed()
			.setTitle(randomMemeData.title)
			.setImage(randomMemeData.url)
			.setFields([
				{name: 'Votes', value: `${randomMemeData.ups} / ${randomMemeData.downs}`, inline: false}
			])
			.setURL(`https://www.reddit.com${randomMemeData.permalink}`);

		await interaction.reply({embeds: [embed]});
	}
};