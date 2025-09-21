import axios from "axios";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { randomItemInArray, selectRandomColor } from "@/constants/index.ts";
import type { IMemes } from "@/declarations/memes.ts";
import type { Command } from "@/interfaces/Command.ts";

export const command: Command = {
	name: "bird",
	ownerOnly: false,
	cooldown: 3,
	usage: "bird",
	data: new SlashCommandBuilder()
		.setName("bird")
		.setDescription("Displays an image of a bird."),
	execute: async (_, interaction) => {
		await interaction.deferReply();
		const { data } = await axios.get(
			"https://www.reddit.com/r/birding/top.json?sort=top&t=day&limit=100",
		);
		const randomMemeData = randomItemInArray<IMemes>(data.data.children).data;
		const embed = new EmbedBuilder()
			.setTitle(randomMemeData.title)
			.setImage(randomMemeData.url)
			.setColor(selectRandomColor())
			.setFields([
				{
					name: "Votes",
					value: `${randomMemeData.ups} / ${randomMemeData.downs}`,
					inline: false,
				},
			])
			.setURL(`https://www.reddit.com${randomMemeData.permalink}`);

		// await interaction.reply({ embeds: [embed] });
		// const embed = new EmbedBuilder()
		// 	.setTitle(bold(underscore('Here is a bird! Soar my little friend!'))) //`**Here is a bird! Soar my little friend!**`)
		// 	.setImage(data.url)
		// 	.setFooter({ text: 'From Reddit' });

		await interaction.followUp({ embeds: [embed] });
	},
};
