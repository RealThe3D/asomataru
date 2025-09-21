import { SlashCommandBuilder, time } from "discord.js";
import type { Command } from "@/interfaces/Command.ts";

export const command: Command = {
	name: "time",
	cooldown: 10,
	ownerOnly: false,
	usage: "time",
	data: new SlashCommandBuilder()
		.setName("time")
		.setDescription("Shows what time it is"),
	execute: async (_, interaction) => {
		await interaction.reply(`It is currently ${time()}`);
	},
};
