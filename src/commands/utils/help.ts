import {
	Colors,
	EmbedBuilder,
	MessageFlags,
	SlashCommandBuilder,
} from "discord.js";
import type { Command } from "@/interfaces/Command.ts";

export const command: Command = {
	name: "help",
	ownerOnly: false,
	cooldown: 0,
	usage: "help (command)",
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("Displays help")
		.addStringOption((option) =>
			option.setName("command").setDescription("Name of command"),
		),
	execute: async (client, interaction) => {
		const cmdValue = interaction.options.getString("command");
		if (!cmdValue) {
			const embed = new EmbedBuilder()
				.setDescription(
					"For more information about a command, use `help <command_name>` command",
				)
				.setColor(Colors.Green)
				.setTimestamp(new Date());
			const help = new Map<string, string[]>();

			client.commands.forEach((command) => {
				const category = command.module as string;
				const commands = help.get(category) ?? [];

				commands.push(`\`${command.name}\``);
				help.set(category, commands);
			});

			for (const [category, commands] of help) {
				embed.addFields({
					name: `**${category.charAt(0).toUpperCase() + category.slice(1)}**`,
					value: commands.join(" "),
				});
			}
			await interaction.reply({
				embeds: [embed],
				flags: MessageFlags.Ephemeral,
			});
		} else {
			const foundCommand = client.commands.get(cmdValue);
			if (foundCommand) {
				const embed = new EmbedBuilder()
					.setTitle(
						foundCommand.data.name.charAt(0).toUpperCase() +
							foundCommand.name.slice(1),
					)
					.setFields([
						{
							name: "Usage",
							value: foundCommand.usage || "Not Found",
						},
					])
					.setColor(Colors.Green)
					.setFooter({ text: "() - Optional, <> - Required" });
				await interaction.reply({
					embeds: [embed],
					flags: MessageFlags.Ephemeral,
				});
			} else {
				await interaction.reply({
					content: `Command with name "${cmdValue}" was not found.`,
					flags: MessageFlags.Ephemeral,
				});
			}
		}
	},
};
