import { MessageEmbed } from 'discord.js';
import axios from 'axios';
import { Command } from '../../interfaces/Command';
import { SlashCommandBuilder, bold, underscore } from '@discordjs/builders';

export const command: Command = {
	name: 'bird',
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 3,
	usage: 'bird',
	data: new SlashCommandBuilder().setName('bird').setDescription('Displays an image of a bird.'),
	execute: async (client, interaction) => {
		const { data } = await axios.get(
			'https://meme-api.herokuapp.com/gimme/birds'
		);

		const embed = new MessageEmbed()
			.setTitle(bold(underscore('Here is a bird! Soar my little friend!'))) //`**Here is a bird! Soar my little friend!**`)
			.setImage(data.url)
			.setFooter('From Reddit');

		await interaction.reply({ embeds: [embed] });
	},
};
