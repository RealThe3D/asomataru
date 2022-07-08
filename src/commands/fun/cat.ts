import { MessageEmbed } from 'discord.js';
import axios from 'axios';
import { Command } from '../../interfaces/Command';
import { SlashCommandBuilder, bold, underscore } from '@discordjs/builders';

export const command: Command = {
	name: 'cat',
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'cat',
	data: new SlashCommandBuilder().setName('cat').setDescription('Displays an image of a cat'),
	execute: async (client, interaction) => {
		const { data } = await axios.get('http://aws.random.cat/meow');

		const embed = new MessageEmbed()
			.setTitle(bold(underscore('Who is a good cuddly kitten!')))
			.setImage(data.file)
			.setFooter('Powered by aws.random.cat API');

		await interaction.reply({ embeds: [embed] });
	},
};
