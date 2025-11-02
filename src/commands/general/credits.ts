import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	Colors,
	ComponentType,
	EmbedBuilder,
	type MessageComponentInteraction,
	SlashCommandBuilder,
} from "discord.js";
import type { Command } from "@/interfaces/Command.ts";

export const command: Command = {
	name: "credits",
	ownerOnly: false,
	cooldown: 0,
	usage: "credits",
	data: new SlashCommandBuilder()
		.setName("credits")
		.setDescription("A dedication towards friends and/or supporters."),
	execute: async (_, interaction) => {
		const credits = [
			[
				"Luna (infinitetime) aka Asomataru-Chan - The person this bot is named after! Subscribe to their YouTube and Twitch!",
				"Davska (davska) - Pro smash player, and loves the Sinnoh region! Happy about the remakes!",
				"Kandrina (kandrina) - Lovely woman from Austria, but eats too many ribs",
				"Akashic Bearer (akashicbearer) - A discord bot programmer who totally has a better bot than me, except it is not running v14.",
				"Mochi (mo\\_mochi) - Cool person, loves to eat mochi and is not a fan of veins.",
				"Incineroar (incinesk) - One Piece connoisseur and pro smash player!",
				"SteelyMite (steelymite) - Graduated from University! I am proud of him!",
				"Ditlus (ditlus) - An aspiring cook from Costa Rica! 🥰",
				"Kayla (qtkayla13) - Pro Minecraft and volleyball player, and she also smells!",
			],
			[
				"Ethereal (ethereal_23) - Pro HSR player, happy about the release of Dragon Age: Veilguard!",
				"Cellion (itsyahomie.) - Pro HSR player, has arguably one of the best Topaz builds I've ever seen!",
				"SkidShot (skidshot) - Pro HSR player, has a **totally** relatable Feixiao build.",
			],
		];

		const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents([
			new ButtonBuilder()
				.setCustomId("backwards")
				.setLabel("Previous")
				.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
				.setCustomId("stop")
				.setLabel("Stop")
				.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
				.setCustomId("forward")
				.setLabel("Next")
				.setStyle(ButtonStyle.Secondary),
		]);

		const filter = (i: MessageComponentInteraction) => {
			return (
				(i.customId === "backwards" ||
					i.customId === "stop" ||
					i.customId === "forward") &&
				i.user.id === interaction.user?.id
			);
		};
		const collector = interaction.channel?.createMessageComponentCollector({
			filter,
			time: 60000,
			componentType: ComponentType.Button,
		});

		let pageNum = 0;

		const creditsEmbed = new EmbedBuilder()
			.setTitle("A dedication to my friends!")
			.setDescription(credits[pageNum].join("\n\n"))
			.setColor(Colors.LuminousVividPink);

		collector?.on("collect", async (i) => {
			await i.deferUpdate();

			switch (i.customId) {
				case "forward":
					pageNum++;
					creditsEmbed.setDescription(credits[pageNum].join("\n\n"));
			}
			await i.editReply({ embeds: [creditsEmbed], components: [buttons] });
		});
		await interaction.reply({ embeds: [creditsEmbed], components: [buttons] });
	},
};
