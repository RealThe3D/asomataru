import { Command } from '../../interfaces/Command';
import {
	EmbedBuilder,
	SlashCommandBuilder,
	PermissionsBitField,
	User,
	Colors,
} from 'discord.js';

export const command: Command = {
	name: 'kick',
	permissions: [PermissionsBitField.Flags.KickMembers],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'ban (@mention or userID) (reason)',
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kick a user.')
		.addUserOption((option) =>
			option
				.setName('mention')
				.setDescription('Mention a user')
				.setRequired(true)
		)
		.addStringOption((option) =>
			option.setName('reason').setDescription('Reason for kicking.')
		),
	// .addStringOption(option => option.setName('id').setDescription('id of the user')),

	execute: async (client, interaction) => {
		const mentioned = interaction.options.getUser('mention') as User;
		const reason = interaction.options.getString('reason') || 'No reason given';

		try {
			await interaction.guild?.members.kick(mentioned);
		} catch (e) {
			console.log(e);
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
				{ name: 'Reason', value: `${reason}`, inline: false }
			);
		await interaction.reply({ embeds: [embed] });
	},
};
