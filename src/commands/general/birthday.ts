import { Colors, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import type { Command } from "@/interfaces/Command.ts";

export const command: Command = {
	name: "birthday",
	ownerOnly: false,
	cooldown: 0,
	usage: "avatar (@mention or userID)",
	data: new SlashCommandBuilder()
		.setName("birthday")
		.setDescription("See whose birthday it is!"),
	execute: async (_, interaction) => {
		const embed = new EmbedBuilder()
			.setTitle(`Happy Birthday, Luna! 🏳️‍⚧️`)
			.setImage(
				"https://images-ext-1.discordapp.net/external/npery_fDaGYOmpoQu2_d0k7jzWlCoPi28wfZGm3ENqA/https/cdn.discordapp.com/avatars/564755874736898048/f35cdfa0b8ba588d179678b83d44c555.png?format=webp&quality=lossless&width=160&height=160",
			)
			.setFooter({ text: "July 29th, 2024" })
			.setColor(Colors.LuminousVividPink);

		await interaction.reply({ embeds: [embed] });
	},
};
