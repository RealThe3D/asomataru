import { Command } from '../../interfaces/Command';
import { MessageEmbed } from 'discord.js';
import axios from 'axios';
import { SlashCommandBuilder, bold, underscore } from '@discordjs/builders';

export const command: Command = {
	name: 'moemorphism',
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'moemorphism',
	data: new SlashCommandBuilder().setName('moemorphism').setDescription('Sends an random moemorphism of something'),
	execute: async (client, interaction) => {
		const { data } = await axios.get(
			'https://meme-api.herokuapp.com/gimme/moemorphism'
		);

		const embed = new MessageEmbed()
			.setImage(data.url)
			.setTitle(bold(underscore('Moemorphism')))
			.setURL(`https://reddit.com/r/${data.subreddit}`)
			.setFooter(`From r/${data.subreddit}`);

		await interaction.reply({ embeds: [embed] });
	},
};
