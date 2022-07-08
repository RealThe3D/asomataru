import { SlashCommandBuilder } from '@discordjs/builders';
import axios from 'axios';
import { MessageEmbed } from 'discord.js';
import { Command } from '../../interfaces/Command';

export const command: Command = {
	name: 'uselessfact',
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 3,
	usage: 'uselessfact',
	data: new SlashCommandBuilder().setName('uselessfact').setDescription('Sends a utterly, useless fact.'),
	execute: async (client, interaction) => {
		const { data } = await axios.get(
			'https://uselessfacts.jsph.pl/random.json?language=en'
		);

		const embed = new MessageEmbed()
			.setTitle('**__Useless Fact!__**')
			.setDescription(data.text)
			.setFooter('Powered by uselessfacts.jsph.pl');

		await interaction.reply({ embeds: [embed] });
	},
};
