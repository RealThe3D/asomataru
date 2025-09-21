import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import type { Command } from "@/interfaces/Command.ts";

export const command: Command = {
	name: "avatar",
	ownerOnly: false,
	cooldown: 2,
	usage: "avatar (@mention or userID)",
	data: new SlashCommandBuilder()
		.setName("avatar")
		.setDescription("Displays a user's avatar")
		.addUserOption((option) =>
			option
				.setName("user")
				.setDescription(
					"user avatar to display. If omitted, displays your avatar.",
				),
		),
	execute: async (_, interaction) => {
		const user = interaction.options.getUser("user") || interaction.user;

		const embed = new EmbedBuilder()
			.setTitle(`${user.username}'s Avatar`)
			.setImage(
				user.displayAvatarURL({
					size: 512,
					extension: "png",
				}),
			);

		await interaction.reply({ embeds: [embed] });
	},
};
