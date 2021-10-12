import { Command } from '../../interfaces/Command';
import { MessageEmbed } from 'discord.js';
import axios from 'axios';

export const command: Command = {
	name: 'moemorphism',
	aliases: ['moe'],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'moemorphism',
	execute: async (client, message, args) => {
		let { data } = await axios.get(
			'https://meme-api.herokuapp.com/gimme/moemorphism'
		);

		const embed = new MessageEmbed()
			.setImage(data.url)
			.setTitle(`**__Moemorphism__**`)
			.setURL(`https://reddit.com/r/${data.subreddit}`)
			.setFooter(`From r/${data.subreddit}`);

		message.channel.send({ embeds: [embed] });
	},
};
