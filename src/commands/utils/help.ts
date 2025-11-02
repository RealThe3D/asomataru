import { Colors, EmbedBuilder, MessageFlags, SlashCommandBuilder } from "discord.js";
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
			const help = {} as any;
			client.commands.forEach((command) => {
				// @ts-expect-error idk
				const cat = command.module;

				if (!Object.hasOwn(help, cat)) help[cat] = [];

				help[cat].push(`\`${command.name}\``);
			});

			for (const category in help) {
				embed.addFields([
					{
						name: `**${category.charAt(0).toUpperCase() + category.slice(1)}**`,

						value: help[category].join(" "),
					},
				]);
			}
			await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
		} else {
			let command: any = cmdValue;
			if (client.commands.has(command)) {
				command = client.commands.get(command);
				const embed = new EmbedBuilder()
					.setTitle(
						command.data.name.charAt(0).toUpperCase() + command.name.slice(1),
					)
					.setFields([
						{
							name: "Usage",
							value: command.usage ? command.usage : "Not Found",
						},
					])
					.setColor(Colors.Green)
					.setFooter({ text: "() - Optional, <> - Required" });
				await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
			} else {
				await interaction.reply({
					content: `Command with name " + \`${command}\` was not found.`,
					flags: MessageFlags.Ephemeral,
				});
			}
		}
	},
};
