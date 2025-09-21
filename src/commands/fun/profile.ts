import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { eq } from "drizzle-orm";
import { db, users as usersTable } from "@/db/index.ts";
import type { Command } from "@/interfaces/Command.ts";

export const command: Command = {
	name: "profile",
	ownerOnly: false,
	cooldown: 0,
	usage: "profile (@mention or userID)",
	data: new SlashCommandBuilder()
		.setName("profile")
		.setDescription("Display a profile.")
		.addUserOption((option) =>
			option
				.setName("user")
				.setDescription(
					"User to target. If omitted, uses the user of this command as the target.",
				),
		),
	execute: async (_, interaction) => {
		const user = interaction.options.getUser("user") || interaction.user;

		if (user.bot) {
			return await interaction.reply({
				content: "That is a bot.",
				ephemeral: true,
			});
		}

		const userData = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.id, user.id));

		if (!userData) {
			return await interaction.reply({
				content: "This user has not set up a profile.",
				ephemeral: true,
			});
		}

		const embed = new EmbedBuilder()
			.setTitle(`${user.username}'s Stats`)
			.setFields([
				{
					name: "Coins",
					value: `${userData[0].coins} coins`,
					inline: true,
				},
				{
					name: "Affection",
					value: `${userData[0].affection} affection`,
					inline: true,
				},
			])
			.setFooter({ text: "WORK IN PROGRESS" });
		await interaction.reply({ embeds: [embed] });
	},
};
