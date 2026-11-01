import { COLOR_ROLES } from "@/constants/colorRoles.ts";
import { createColorRoles } from "@/constants/createColorRoles.ts";
import type { Command } from "@/interfaces/Command.ts";
import {
	Colors,
	EmbedBuilder,
	MessageFlags,
	PermissionsBitField,
	type Role,
	SlashCommandBuilder,
} from "discord.js";

const isColorRole = (role: Role) => {
	return (
		!role.managed &&
		role.permissions.bitfield === PermissionsBitField.Default &&
		COLOR_ROLES.some(
			(color) =>
				(color.name === role.name || `Color: ${color.name}` === role.name) &&
				color.color === role.colors.primaryColor,
		)
	);
};

export const command: Command = {
	name: "color",
	ownerOnly: false,
	cooldown: 0,
	usage: "color create | color select (color)",
	data: new SlashCommandBuilder()
		.setName("color")
		.setDescription("Create or choose color roles.")
		// .setDMPermission(false)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("create")
				.setDescription("Create color roles for this server."),
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("select")
				.setDescription("Choose your color role.")
				.addStringOption((option) =>
					option
						.setName("color")
						.setDescription("The color to use.")
						.setRequired(true)
						.addChoices(
							...COLOR_ROLES.map(({ name }) => ({ name, value: name })),
						),
				),
		),
	execute: async (_, interaction) => {
		if (interaction.options.getSubcommand() === "create") {
			return await createColorRoles(interaction);
		}

		const name = interaction.options.getString("color", true);

		if (
			!interaction.guild ||
			!COLOR_ROLES.some((color) => color.name === name)
		) {
			return await interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setColor(Colors.Red)
						.setTitle("Invalid color")
						.setDescription("Choose a valid color in a server."),
				],
				flags: MessageFlags.Ephemeral,
			});
		}

		const matchedRole = interaction.guild.roles.cache.filter(
			(role) => role.name === name && isColorRole(role),
		);

		if (matchedRole.size !== 1) {
			return await interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setColor(Colors.Red)
						.setTitle("Color unavailable")
						.setDescription(
							"That color role is unavailable or ambiguous. Ask a moderator to check the roles.",
						),
				],
				flags: MessageFlags.Ephemeral,
			});
		}
		try {
			const member = await interaction.guild.members.fetch(interaction.user.id);
			const selectedRole = matchedRole.first()!;
			const previousRole = member.roles.cache.filter(
				(role) => role.id !== selectedRole.id && isColorRole(role),
			);
			if (!member.roles.cache.has(selectedRole.id)) {
				await member.roles.add(selectedRole);
			}
			for (const role of previousRole.values())
				await member.roles.remove(role.id);
			await interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setColor(selectedRole.colors.primaryColor)
						.setTitle("Color updated")
						.setDescription(`Your color is now **${name}**.`),
				],
				flags: MessageFlags.Ephemeral,
			});
		} catch (error) {
			console.error(error);
			await interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setColor(Colors.Red)
						.setTitle("Could not update color")
						.setDescription(
							"Ask a moderator to check my permissions and role position.",
						),
				],
				flags: MessageFlags.Ephemeral,
			});
		}
	},
};
