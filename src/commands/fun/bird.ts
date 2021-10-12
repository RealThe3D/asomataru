import { MessageEmbed } from 'discord.js';
import axios from 'axios';
import { Command } from '../../interfaces/Command';

export const command: Command = {
	name: 'bird',
	aliases: [],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'bird',
	execute: async (client, message, args) => {
		let { data } = await axios.get(
			'https://meme-api.herokuapp.com/gimme/birds'
		);

		const embed = new MessageEmbed()
			.setTitle(`**Here is a bird! Soar my little friend!**`)
			.setImage(data.url)
			.setFooter('From Reddit');

		message.channel.send({ embeds: [embed] });
	},
};
