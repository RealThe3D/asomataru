import { Command } from '../../interfaces/Command';
import { MessageEmbed, Permissions, User } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

export const command: Command = {
	name: 'kick',
	permissions: [Permissions.FLAGS.KICK_MEMBERS],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'ban (@mention or userID) (reason)',
	data: new SlashCommandBuilder().setName('kick').setDescription('Kick a user.')
		.addUserOption(option => option.setName('mention').setDescription('Mention a user').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('Reason for kicking.')),
	// .addStringOption(option => option.setName('id').setDescription('id of the user')),
	
	execute: async (client, interaction) => {
		const mentioned = interaction.options.getUser('mention') as User;
		const reason = interaction.options.getString('reason') || 'No reason given';

		await interaction.guild?.members.kick(mentioned).catch(err => console.log(err));

		const embed = new MessageEmbed().setTitle(`Kick | ${mentioned?.tag}`)
		.setColor('RED')
		.setFields(
			{name: 'User', value: `${mentioned.tag}`, inline: true},
			{name: 'Moderator', value: `${interaction.user.username}`, inline: true},
			{name: 'Reason', value: `${reason}`, inline: false} 
		);
		
		await interaction.reply({embeds: [embed]});

	},
};
