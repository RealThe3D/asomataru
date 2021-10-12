import { Command } from '../../interfaces/Command';
import { MessageEmbed } from 'discord.js';
import axios from 'axios';

export const command: Command = {
	name: 'joke',
	aliases: [],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 3,
	usage: 'joke',
	execute: async (client, message, args) => {
		let { data } = await axios.get(
			'https://v2.jokeapi.dev/joke/Any?safe-mode&type=single'
		);

		const embed = new MessageEmbed()
			.setTitle('A joke for you!')
			.setDescription(data.joke)
			.setFooter('Powered by JokeAPI');

		message.channel.send({ embeds: [embed] });
	},
};
