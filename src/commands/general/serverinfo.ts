import { Guild, MessageEmbed } from 'discord.js';
import { Command } from '../../interfaces/Command';
import { verification } from '../../declarations/verification';
import { SlashCommandBuilder } from '@discordjs/builders';

export const command: Command = {
	name: 'serverinfo',
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 3,
	usage: 'serverinfo',
	data: new SlashCommandBuilder().setName('serverinfo').setDescription('Info on the current guild this command is executed on.'),
	execute: async (client, interaction) => {
		const guild = interaction.guild as Guild;
		
		const embed = new MessageEmbed()
			.setColor('GREEN')
			.setThumbnail(`${guild.iconURL()}`)
			.setAuthor(`${guild.name}`)
			.addField('Name', `${guild.name}`, true)
			.addField('ID', `${guild.id}`, true)
			.addField(
				'Owner',
				`${(await guild.fetchOwner())?.user.tag}`,
				true
			)
			// .addField('Region', message.guild?., true)
			.addField(
				'Verification Level',
				verification[`${guild.verificationLevel}`],
				true
			)
			.addField('Members', `${guild.memberCount}`, true)
			.addField('Roles', `${guild.roles.cache.size}`, true)
			.addField('Channels', `${guild.channels.cache.size}`, true)
			// .addField('You Joined', `${interaction.user..joinedAt}`, true)
			.setFooter(`Created ${guild.createdAt}`);

		await interaction.reply({ embeds: [embed] });
	},
};
