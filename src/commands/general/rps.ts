// TODO: Remake in discord.js v13 with buttons

import { MessageReaction, User, MessageEmbed } from 'discord.js';
import { Command } from '../../interfaces/Command';

export const command: Command = {
	name: 'rps',
	aliases: [],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'rps <react to message>',
	execute: async (client, message, args) => {
		message
			.react('🗿')
			.then(() => message.react('📄'))
			.then(() => message.react('✂️'));

		const filter = (reaction: MessageReaction, user: User): boolean => {
			return (
				['🗿', '📄', '✂️'].includes(reaction.emoji.name!) &&
				user.id === message.author.id
			);
		};

		message
			// .awaitReactions(filter, { max: 1, time: 10000, errors: ['time'] })
			.awaitReactions({ filter, max: 1, time: 10000, errors: ['time'] })
			.then((collected) => {
				const reaction = collected.first();

				if (reaction?.emoji.name === '🗿') {
					var moyai = ['🗿', '📄', '✂️'];
					let moyaiembed = new MessageEmbed()
						.setColor('#6b6b6b')
						.setTitle('Rock-Paper-Scissors')
						.setFooter(
							message.author.username,
							message.author.displayAvatarURL()
						)
						.setDescription(
							`Result... 🗿 vs ${
								moyai[Math.floor(Math.random() * moyai.length)]
							}`
						);
					message.channel.send({ embeds: [moyaiembed] });
				}
				if (reaction?.emoji.name === '📄') {
					var paper = ['🗿', '📄', '✂️'];
					let paperembed = new MessageEmbed()
						.setColor('#f2f2f2')
						.setAuthor('Rock-Paper-Scissors')
						.setFooter(
							message.author.username,
							message.author.displayAvatarURL()
						)
						.setDescription(
							`Result... 📄 vs ${
								paper[Math.floor(Math.random() * paper.length)]
							}`
						);
					message.channel.send({ embeds: [paperembed] });
				}
				if (reaction?.emoji.name === '✂️') {
					var siss = ['🗿', '📄', '✂️'];
					let sissembed = new MessageEmbed()
						.setColor('#ed5353')
						.setAuthor('Rock-Paper-Scissors')
						.setFooter(
							message.author.username,
							message.author.displayAvatarURL()
						)
						.setDescription(
							`Result... ✂️ vs ${siss[Math.floor(Math.random() * siss.length)]}`
						);
					message.channel.send({ embeds: [sissembed] });
				}
			})
			.catch(() => {
				message.channel.send('Query cancelled. Please select an reaction.');
			});
	},
};
