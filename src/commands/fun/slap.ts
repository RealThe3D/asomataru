import axios from "axios";
import { Colors, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { eq } from "drizzle-orm";
import { db, decrement, users as usersTable } from "@/db/index.ts";
import type { Command } from "@/interfaces/Command.ts";

export const command: Command = {
	name: "slap",
	ownerOnly: false,
	cooldown: 3,
	usage: "slap (@mention or userID)",
	data: new SlashCommandBuilder()
		.setName("slap")
		.setDescription("Slap someone.")
		.addUserOption((option) =>
			option
				.setName("user")
				.setDescription(
					"User to target. If omitted, uses the user of this command as the target.",
				),
		),
	execute: async (_, interaction) => {
		const user = interaction.options.getUser("user") || interaction.user;

		const embed = new EmbedBuilder().setColor(Colors.Red);

		const { data } = await axios.get("https://nekos.life/api/v2/img/slap");

		if (user.id === interaction.user.id) {
			embed.setTitle("They... slapped themselves?");
		} else {
			embed.setTitle(`${interaction.user.username} slapped ${user.username}!`);

			const users = await db
				.update(usersTable)
				.set({
					affection: decrement(usersTable.affection, 5),
				})
				.where(eq(usersTable.id, interaction.user.id))
				.returning();

			embed.setFooter({
				text: `That's mean!!! ._. , You lost 5 affection, you now have ${users[0].affection} Affection...`,
			});
		}
		embed.setImage(data.url);

		await interaction.reply({ embeds: [embed] });
	},
};
