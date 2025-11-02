import { EmbedBuilder, MessageFlags, SlashCommandBuilder } from "discord.js";
import { selectRandomColor } from "@/constants/index.ts";
import type { Command } from "@/interfaces/Command.ts";

export const command: Command = {
	name: "banner",
	ownerOnly: false,
	cooldown: 2,
	usage: "banner (@mention or userID)",
	data: new SlashCommandBuilder()
		.setName("banner")
		.setDescription("Displays a user's banner")
		.addUserOption((option) =>
			option
				.setName("user")
				.setDescription(
					"User banner to display. If omitted, displays your banner.",
				),
		),
	execute: async (_, interaction) => {
		const user = interaction.options.getUser("user") || interaction.user;
		const userBanner = await user.fetch(true);

		if (!userBanner.banner) {
			return await interaction.reply({
				content:
					"That user does not have a banner. They need to be a Nitro member and set an image as a banner.",
				flags: MessageFlags.Ephemeral,
			});
		}
		const embed = new EmbedBuilder()
			.setTitle(`${user.username}'s Banner`)
			.setImage(
				userBanner.bannerURL({
					size: 512,
					extension: "png",
				}) as string,
			)
			.setColor(selectRandomColor());

		await interaction.reply({ embeds: [embed] });
	},
};
