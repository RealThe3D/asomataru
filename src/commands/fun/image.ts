import axios from "axios";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { randomItemInArray } from "@/constants/index.ts";
import type { IMemes } from "@/declarations/memes.ts";
import type { Command } from "@/interfaces/Command.ts";

export const command: Command = {
	name: "image",
	ownerOnly: false,
	cooldown: 3,
	usage: "daily",
	data: new SlashCommandBuilder()
		.setName("image")
		.setDescription("Show animal image.")
		.addSubcommand((subcommand) =>
			subcommand.setName("dog").setDescription("Display an image of a dog"),
		)
		.addSubcommand((subcommand) =>
			subcommand.setName("cat").setDescription("Display an image of a cat"),
		)
		.addSubcommand((subcommand) =>
			subcommand.setName("bird").setDescription("Display an image of a bird"),
		),
	execute: async (_, interaction) => {
		await interaction.deferReply();

		// This maps the subcommand name to its corresponding subreddit.
		const subRedditMap = new Map([
			["dog", "dogpictures"],
			["bird", "birding"],
			["cat", "catpics"],
		]);

		const chosenSubReddit = subRedditMap.get(
			interaction.options.getSubcommand(),
		);

		const { data } = await axios.get(
			`https://www.reddit.com/r/${chosenSubReddit}/top.json?sort=top&t=day&limit=100`,
		);
		const randomMemeData = randomItemInArray<IMemes>(data.data.children).data;
		const embed = new EmbedBuilder()
			.setTitle(randomMemeData.title)
			.setImage(randomMemeData.url)
			.setColor("#FF5700")
			.setURL(`https://www.reddit.com${randomMemeData.permalink}`)
			.setFooter({
				text: `u/${randomMemeData.author} on r/${chosenSubReddit}`,
			})
			.setTimestamp(randomMemeData.created * 1000);

		await interaction.followUp({ embeds: [embed] });
	},
};
