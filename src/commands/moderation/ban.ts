import { Command } from '../../interfaces/Command';
import { MessageEmbed, Permissions, User } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

export const command: Command = {
	name: 'ban',
	permissions: [Permissions.FLAGS.BAN_MEMBERS],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'ban (@mention or userID) (reason)',
	data: new SlashCommandBuilder().setName('ban').setDescription('Ban a user.')
		.addUserOption(option => option.setName('mention').setDescription('Mention a user').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('Reason for banning.')),
	// .addStringOption(option => option.setName('id').setDescription('id of the user')),
	
	execute: async (client, interaction) => {
		const mentioned = interaction.options.getUser('mention') as User;
		const reason = interaction.options.getString('reason') || 'No reason given';

		try {
			await interaction.guild?.members.ban(mentioned);
		} catch (e) {
			console.log(e);
		}

		const embed = new MessageEmbed().setTitle(`Ban | ${mentioned?.tag}`)
		.setColor('RED')
		.setFields(
			{name: 'User', value: `${mentioned.tag}`, inline: true},
			{name: 'Moderator', value: `${interaction.user.username}`, inline: true},
			{name: 'Reason', value: `${reason}`, inline: false} 
		);
		
		await interaction.reply({embeds: [embed]});

	},
};
