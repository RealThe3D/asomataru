import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder,
	SlashCommandBuilder,
} from "discord.js";
import type { Command } from "@/interfaces/Command.ts";

export const command: Command = {
	name: "invite",
	ownerOnly: false,
	cooldown: 10,
	usage: "invite",
	data: new SlashCommandBuilder()
		.setName("invite")
		.setDescription("Sends an invite to the support server!"),
	execute: async (_, interaction) => {
		const button = new ActionRowBuilder<ButtonBuilder>().addComponents([
			new ButtonBuilder()
				.setLabel("Asomataru's support server")
				.setURL("https://discord.gg/vRPgqtb")
				.setStyle(ButtonStyle.Link),
		]);
		const embed = new EmbedBuilder()
			.setTitle("Asomataru's support server!")
			.setDescription("Join the support server!");

		await interaction.reply({ embeds: [embed], components: [button] });
	},
};
