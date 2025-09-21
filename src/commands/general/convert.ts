import { bold, SlashCommandBuilder } from "discord.js";
import {
	celsiusToFahrenheit,
	fahrenheitToCelsius,
} from "@/constants/math/temp_conversion.ts";
import type { Command } from "@/interfaces/Command.ts";

// TODO: Make this a subgroup command
export const command: Command = {
	name: "convert",
	ownerOnly: false,
	cooldown: 0,
	usage: "convert",
	data: new SlashCommandBuilder()
		.setName("convert")
		.setDescription("Convert between Fahrenheit and Celsius.")
		.addStringOption((option) =>
			option
				.setName("temp_unit")
				.setDescription("Convert from...")
				.setRequired(true)
				.addChoices(
					{ name: "Celsius to Fahrenheit", value: "celsius" },
					{ name: "Fahrenheit to Celsius", value: "fahrenheit" },
				),
		)
		.addNumberOption((option) =>
			option
				.setName("temp_value")
				.setDescription("Temp value")
				.setRequired(true),
		),
	execute: async (_, interaction) => {
		const tempUnit = interaction.options.getString("temp_unit") as string;
		const tempValue = interaction.options.getNumber("temp_value") as number;

		switch (tempUnit) {
			case "celsius":
				await interaction.reply({
					content: `${bold(
						`${tempValue.toString()} °C`,
					)} converted to Fahrenheit is ${bold(
						`${celsiusToFahrenheit(tempValue)} °F.`,
					)}`,
				}); // 100°C converted to Fahrenheit is 212°F.
				break;
			case "fahrenheit":
				await interaction.reply({
					content: `${bold(
						`${tempValue.toString()} °F`,
					)} converted to Celsius is ${bold(
						`${fahrenheitToCelsius(tempValue)} °C.`,
					)}`,
				}); // 100°C converted to Fahrenheit is 212°F.
		}
	},
};
