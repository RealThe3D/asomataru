import axios from 'axios';
import { MessageEmbed } from 'discord.js';
import { Command } from '../../interfaces/Command';

export const command: Command = {
	name: 'uselessfact',
	aliases: ['uf'],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 3,
	usage: 'uselessfact',
	execute: async (client, message, args) => {
		let { data } = await axios.get(
			'https://uselessfacts.jsph.pl/random.json?language=en'
		);

		const embed = new MessageEmbed()
			.setTitle(`**__Useless Fact!__**`)
			.setDescription(data.text)
			.setFooter(`Powered by uselessfacts.jsph.pl`);

		message.channel.send({ embeds: [embed] });
	},
};
