import { Command } from '../../interfaces/Command';
import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export const command: Command = {
	name: 'avatar',
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 2,
	usage: 'avatar (@mention or userID)',
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription("Displays a user's avatar")
		.addUserOption((option) =>
			option
				.setName('user')
				.setDescription(
					'user avatar to display. If omitted, displays your avatar.'
				)
		),
	execute: async (client, interaction) => {
		let user = interaction.options.getUser('user') || interaction.user;

		const embed = new EmbedBuilder()
			.setTitle(`${user.username}'s Avatar`)
			.setImage(
				user.displayAvatarURL({
					size: 512,
					extension: 'png',
				})
			);

		await interaction.reply({ embeds: [embed] });
	},
};
