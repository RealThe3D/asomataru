import { Command } from '@/interfaces/Command.ts';
import {
	Colors,
	EmbedBuilder,
	PermissionFlagsBits,
	SlashCommandBuilder,
	User,
} from 'discord.js';

export const command: Command = {
	name: 'kick',
	ownerOnly: false,
	cooldown: 0,
	usage: 'ban (@mention or userID) (reason)',
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kick a user.')
		.setDefaultMemberPermissions(
			PermissionFlagsBits.BanMembers | PermissionFlagsBits.KickMembers,
		)
		.addUserOption((option) =>
			option
				.setName('mention')
				.setDescription('The user you are trying to ban')
				.setRequired(true)
		)
		.addStringOption((option) =>
			option.setName('reason').setDescription('Reason for kicking.')
		),
	// .addStringOption(option => option.setName('id').setDescription('id of the user')),

	execute: async (_, interaction) => {
		const mentioned = interaction.options.getUser('mention') as User;
		const reason = interaction.options.getString('reason') || 'No reason given';

		try {
			await interaction.guild?.members.kick(mentioned);
		} catch (e) {
			console.log(e);
			return await interaction.reply({ content: 'An error had occurred.' });
		}

		const embed = new EmbedBuilder()
			.setTitle(`Kick | ${mentioned?.tag}`)
			.setColor(Colors.Red)
			.setFields(
				{ name: 'User', value: `${mentioned.tag}`, inline: true },
				{
					name: 'Moderator',
					value: `${interaction.user.username}`,
					inline: true,
				},
				{ name: 'Reason', value: `${reason}`, inline: false },
			);
		await interaction.reply({ embeds: [embed] });
	},
};
