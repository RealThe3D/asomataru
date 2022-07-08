import { MessageEmbed } from 'discord.js';
import axios from 'axios';
import { Command } from '../../interfaces/Command';
import { SlashCommandBuilder, bold, underscore } from '@discordjs/builders';

export const command: Command = {
	name: 'dog',
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 3,
	usage: 'dog',
	data: new SlashCommandBuilder().setName('dog').setDescription('Displays a picture of a dog'),
	execute: async (client, interaction) => {
		const { data } = await axios.get('https://random.dog/woof.json');

		const embed = new MessageEmbed()
			.setTitle(bold(underscore('Who is a good doggo!')))//`**____**`)
			.setImage(data.url)
			.setFooter('Powered by random.dog API');

		await interaction.reply({ embeds: [embed] });
	},
};
