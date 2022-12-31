import { Command } from '../../interfaces/Command';
import {
	EmbedBuilder,
	PermissionsBitField,
	User,
	SlashCommandBuilder,
	Colors,
	ChatInputCommandInteraction,
} from 'discord.js';

export const command: Command = {
	name: 'ban',
	permissions: [PermissionsBitField.Flags.BanMembers],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'ban (@mention or userID) (reason)',
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban a user.')
		.addUserOption((option) =>
			option
				.setName('mention')
				.setDescription('Mention a user')
				.setRequired(true)
		)
		.addStringOption((option) =>
			option.setName('reason').setDescription('Reason for banning.')
		),
	// .addStringOption(option => option.setName('id').setDescription('id of the user')),

	execute: async (client, interaction) => {
		const mentioned = interaction.options.getUser('mention') as User;
		const reason = interaction.options.getString('reason') || 'No reason given';

		try {
			await interaction.guild?.members.ban(mentioned);
		} catch (e) {
			console.log(e);
		}

		const embed = new EmbedBuilder()
			.setTitle(`Ban | ${mentioned?.tag}`)
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
