import {
	Colors,
	EmbedBuilder,
	PermissionFlagsBits,
	SlashCommandBuilder,
	type User,
} from "discord.js";
import type { Command } from "@/interfaces/Command.ts";

export const command: Command = {
	name: "ban",
	ownerOnly: false,
	cooldown: 0,
	usage: "ban (@mention or userID) (reason)",
	data: new SlashCommandBuilder()
		.setName("ban")
		.setDescription("Ban a user.")
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.addUserOption((option) =>
			option
				.setName("mention")
				.setDescription("Mention a user")
				.setRequired(true),
		)
		.addStringOption((option) =>
			option.setName("reason").setDescription("Reason for banning."),
		),
	// .addStringOption(option => option.setName('id').setDescription('id of the user')),

	execute: async (_, interaction) => {
		const mentioned = interaction.options.getUser("mention") as User;
		const reason = interaction.options.getString("reason") || "No reason given";

		try {
			await interaction.guild?.members.ban(mentioned);
		} catch (e) {
			console.log(e);
			return await interaction.reply({ content: "An error had occurred." });
		}

		const embed = new EmbedBuilder()
			.setTitle(`Ban | ${mentioned?.tag}`)
			.setColor(Colors.Red)
			.setFields(
				{ name: "User", value: `${mentioned.tag}`, inline: true },
				{
					name: "Moderator",
					value: `${interaction.user.username}`,
					inline: true,
				},
				{ name: "Reason", value: `${reason}`, inline: false },
			);

		await interaction.reply({ embeds: [embed] });
	},
};
