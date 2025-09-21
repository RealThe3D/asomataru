import axios from "axios";
import { bold, EmbedBuilder, SlashCommandBuilder, underline } from "discord.js";
import { selectRandomColor } from "@/constants/randomColors.ts";
import type { Command } from "@/interfaces/Command.ts";

export const command: Command = {
	name: "dog",
	ownerOnly: false,
	cooldown: 3,
	usage: "dog",
	data: new SlashCommandBuilder()
		.setName("dog")
		.setDescription("Displays a picture of a dog"),
	execute: async (_, interaction) => {
		await interaction.deferReply();
		const { data } = await axios.get("https://random.dog/woof.json");

		const embed = new EmbedBuilder()
			.setTitle(bold(underline("Who is a good doggo!"))) //`**____**`)
			.setImage(data.url)
			.setColor(selectRandomColor())
			.setFooter({ text: "Powered by random.dog API" });

		await interaction.followUp({ embeds: [embed] });
	},
};
