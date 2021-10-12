import { MessageEmbed } from 'discord.js';
import axios from 'axios';
import { Command } from '../../interfaces/Command';

export const command: Command = {
	name: 'cat',
	aliases: ['meow'],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'cat',
	execute: async (client, message, args) => {
		let { data } = await axios.get('http://aws.random.cat/meow');

		const embed = new MessageEmbed()
			.setTitle(`**__Who is a good cuddly kitten!__**`)
			.setImage(data.file)
			.setFooter(`Powered by aws.random.cat API`);

		message.channel.send({ embeds: [embed] });
	},
};
