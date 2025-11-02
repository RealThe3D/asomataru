import { Colors, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { eq } from "drizzle-orm";
import { db, increment, users as usersTable } from "@/db/index.ts";
import type { Command } from "@/interfaces/Command.ts";

export const command: Command = {
	name: "daily",
	ownerOnly: false,
	cooldown: 86400,
	usage: "daily",
	data: new SlashCommandBuilder()
		.setName("daily")
		.setDescription("Redeem your dailies."),
	execute: async (_, interaction) => {
		const randomAmount = Math.floor(Math.random() * Math.floor(750)); // 1-750

		const users = await db
			.update(usersTable)
			.set({ coins: increment(usersTable.coins, randomAmount) })
			.where(eq(usersTable.id, interaction.user.id))
			.returning();

		const embed = new EmbedBuilder()
			.setColor(Colors.Green)
			.setTitle(`${interaction.user.username}'s Daily Rewards`)
			.setDescription(
				`Your daily reward is ${randomAmount} coins! You now have ${users[0].coins} coins.`,
			);
		await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
	},
};
