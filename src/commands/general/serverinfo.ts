import { MessageEmbed } from 'discord.js';
import { Command } from '../../interfaces/Command';
import { verification } from '../../declarations/verification';

export const command: Command = {
	name: 'serverinfo',
	aliases: ['si', 'sinfo'],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 3,
	usage: 'serverinfo',
	execute: async (client, message, args) => {
		let embed = new MessageEmbed()
			.setColor('GREEN')
			.setThumbnail(`${message.guild?.iconURL()}`)
			.setAuthor(`${message.guild?.name}`)
			.addField('Name', `${message.guild?.name}`, true)
			.addField('ID', `${message.guild?.id}`, true)
			.addField(
				'Owner',
				`${(await message.guild?.fetchOwner())?.user.tag}`,
				true
			)
			// .addField('Region', message.guild?., true)
			.addField(
				'Verification Level',
				verification[`${message.guild?.verificationLevel!}`],
				true
			)
			.addField('Members', `${message.guild?.memberCount}`, true)
			.addField('Roles', `${message.guild?.roles.cache.size}`, true)
			.addField('Channels', `${message.guild?.channels.cache.size}`, true)
			.addField('You Joined', `${message.member?.joinedAt}`, true)
			.setFooter(`Created ${message.guild?.createdAt}`);

		message.channel.send({ embeds: [embed] });
	},
};
