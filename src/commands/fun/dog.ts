import { MessageEmbed } from 'discord.js';
import axios from 'axios';
import { Command } from '../../interfaces/Command';

export const command: Command = {
	name: 'dog',
	aliases: ['doggo'],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'dog',
	execute: async (client, message, args) => {
		let { data } = await axios.get('https://random.dog/woof.json');

		const embed = new MessageEmbed()
			.setTitle(`**__Who is a good doggo!__**`)
			.setImage(data.url)
			.setFooter(`Powered by random.dog API`);

		message.channel.send({ embeds: [embed] });
	},
};
