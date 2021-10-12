import { MessageEmbed } from 'discord.js';
import { Command } from '../../interfaces/Command';
import axios from 'axios';

export const command: Command = {
	name: 'neko',
	aliases: [],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'neko',
	execute: async (client, message, args) => {
		let { data } = await axios.get('https://nekos.life/api/v2/img/neko');

		const embed = new MessageEmbed()
			.setTitle(`**Here is a neko! UwU**`)
			.setImage(data.url)
			.setFooter('Powered by nekos.life');

		message.channel.send({ embeds: [embed] });
	},
};
