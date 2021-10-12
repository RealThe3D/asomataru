import { Command } from '../../interfaces/Command';
import { MessageEmbed } from 'discord.js';
import axios from 'axios';

export const command: Command = {
	name: 'anime',
	aliases: ['waifu'],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 5,
	usage: 'anime',
	execute: async (client, message, args) => {
		let { data } = await axios.get('https://nekos.life/api/v2/img/waifu');

		const embed = new MessageEmbed()
			.setTitle(`**Here is an waifu! OwO**`)
			.setImage(data.url)
			.setFooter('Powered by nekos.life');

		message.channel.send({ embeds: [embed] });
	},
};
