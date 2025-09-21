import {
	Colors,
	EmbedBuilder,
	type Guild,
	SlashCommandBuilder,
} from "discord.js";
import { Verification } from "@/declarations/verification.ts";
import type { Command } from "@/interfaces/Command.ts";

export const command: Command = {
	name: "serverinfo",
	ownerOnly: false,
	cooldown: 3,
	usage: "serverinfo",
	data: new SlashCommandBuilder()
		.setName("serverinfo")
		.setDescription("Info on the current server this command is executed on."),
	execute: async (_, interaction) => {
		const guild = interaction.guild as Guild;
		let verification: Verification;
		switch (guild.verificationLevel) {
			case 1:
				verification = Verification.LOW;
				break;
			case 2:
				verification = Verification.MEDIUM;
				break;
			case 3:
				verification = Verification.HIGH;
				break;
			case 4:
				verification = Verification.HIGHEST;
				break;
			default:
				verification = Verification.LOW;
				break;
		}

		const embed = new EmbedBuilder()
			.setColor(Colors.Green)
			.setThumbnail(`${guild.iconURL()}`)
			.setAuthor({ name: `${guild.name}` })
			.setFields([
				{ name: "Name", value: `${guild.name}`, inline: true },
				{ name: "ID", value: `${guild.id}`, inline: true },
				{ name: "Owner", value: `${await guild.fetchOwner()}` },
				{
					name: "Verification Level",
					value: `${verification}`,
					inline: true,
				},
				{
					name: "Boost Level",
					value: `${guild.premiumTier}`,
					inline: true,
				},
				{
					name: "Members",
					value: `${guild.memberCount}`,
					inline: true,
				},
				{
					name: "Roles",
					value: `${(await guild.roles.fetch()).size}`,
					inline: true,
				},
				{
					name: "Channels",
					value: `${guild.channels.channelCountWithoutThreads}`,
					inline: true,
				},
			])
			.setFooter({
				text: `${guild.name} was created on ${guild.createdAt}.`,
			});

		await interaction.reply({ embeds: [embed] });
	},
};
