import axios from "axios";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import type { Command } from "@/interfaces/Command.ts";

export const command: Command = {
	name: "joke",
	ownerOnly: false,
	cooldown: 3,
	usage: "joke",
	data: new SlashCommandBuilder()
		.setName("joke")
		.setDescription("Sends a joke in chat"),
	execute: async (_, interaction) => {
		await interaction.deferReply();
		const { data } = await axios.get(
			"https://v2.jokeapi.dev/joke/Any?safe-mode&type=single",
		);

		const embed = new EmbedBuilder()
			.setTitle("A joke for you!")
			.setDescription(data.joke)
			.setFooter({ text: "Powered by JokeAPI" });

		await interaction.followUp({ embeds: [embed] });
	},
};
