import { COLOR_ROLES } from "@/constants/colorRoles.ts";
import {
	Colors,
	EmbedBuilder,
	MessageFlags,
	PermissionFlagsBits,
	PermissionsBitField,
	type ChatInputCommandInteraction,
} from "discord.js";

const createColorRoles = async (interaction: ChatInputCommandInteraction) => {
	if (
		!interaction.guild ||
		!interaction.memberPermissions?.has(PermissionFlagsBits.ManageGuild)
	) {
		return await interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setColor(Colors.Red)
					.setTitle("Permission required")
					.setDescription(
						"You need Manage Server permission to create color roles in a server.",
					),
			],
			flags: MessageFlags.Ephemeral,
		});
	}
	await interaction.deferReply({ flags: MessageFlags.Ephemeral });

	let created = 0;
	let skipped = 0;

	try {
		const roles = await interaction.guild.roles.fetch();
		for (const role of COLOR_ROLES) {
			if (roles.some((existing) => existing.name === role.name)) {
				skipped++;
				continue;
			}
			await interaction.guild.roles.create({
				name: role.name,
				color: role.color,
				permissions: PermissionsBitField.Default,
				reason: "Create selectable color roles",
			});
			created++;
		}
		await interaction.editReply({
			embeds: [
				new EmbedBuilder()
					.setColor(Colors.Blurple)
					.setTitle("Color roles created")
					.setDescription(
						`Created **${created}** color roles; skipped **${skipped}** existing role names.\nUse /color select to choose a color.`,
					),
			],
		});
	} catch (error) {
		console.error("Failed to create color roles:", error);
		await interaction.editReply({
			embeds: [
				new EmbedBuilder()
					.setColor(Colors.Red)
					.setTitle("Could not create color roles")
					.setDescription(
						`Created **${created}** color roles before an error occurred. Check that I have Manage Roles permission and try again.`,
					),
			],
		});
	}
};

export { createColorRoles };