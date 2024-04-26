import { Command } from '../../interfaces/Command';
import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export const command: Command = {
	name: 'banner',
	ownerOnly: false,
	cooldown: 2,
	usage: 'banner (@mention or userID)',
	data: new SlashCommandBuilder()
		.setName('banner')
		.setDescription("Displays a user's banner")
		.addUserOption((option) =>
			option
				.setName('user')
				.setDescription(
					'User banner to display. If omitted, displays your banner.'
				)
		),
	execute: async (client, interaction) => {
		const user = interaction.options.getUser('user') || interaction.user;
		const userBanner = await user.fetch(true);

		if (!userBanner.banner) {
			return await interaction.reply({
				content:
					'That user does not have a banner. They need to be a Nitro member and set an image as a banner.',
				ephemeral: true,
			});
		}
		const embed = new EmbedBuilder()
			.setTitle(`${user.username}'s Avatar`)
			.setImage(
				userBanner.bannerURL({
					size: 512,
					extension: 'png',
				})!
			);

		await interaction.reply({ embeds: [embed] });
	},
};
