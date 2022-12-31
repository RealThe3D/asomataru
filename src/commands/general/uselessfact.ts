import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import axios from 'axios';
import { Command } from '../../interfaces/Command';

export const command: Command = {
	name: 'uselessfact',
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 3,
	usage: 'uselessfact',
	data: new SlashCommandBuilder()
		.setName('uselessfact')
		.setDescription('Sends a utterly, useless fact.'),
	execute: async (client, interaction) => {
		const { data } = await axios.get(
			'https://uselessfacts.jsph.pl/random.json?language=en'
		);

		const embed = new EmbedBuilder()
			.setTitle('**__Useless Fact!__**')
			.setDescription(data.text)
			.setFooter({ text: 'Powered by uselessfacts.jsph.pl' });

		await interaction.reply({ embeds: [embed] });
	},
};
