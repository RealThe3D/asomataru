import { SlashCommandBuilder, bold } from 'discord.js';
import { Command } from '../../interfaces/Command';

// TODO: Make this a subgroup command
export const command: Command = {
	name: 'convert',
	ownerOnly: false,
	cooldown: 0,
	usage: 'convert',
	data: new SlashCommandBuilder()
		.setName('convert')
		.setDescription('Convert between Fahrenheit and Celsius.')
		.addStringOption((option) =>
			option
				.setName('tempunit')
				.setDescription('Convert from...')
				.setRequired(true)
				.addChoices(
					{ name: 'Celsius to Fahrenheit', value: 'celsius' },
					{ name: 'Fahrenheit to Celsius', value: 'fahrenheit' }
				)
		)
		.addNumberOption((option) =>
			option
				.setName('temp_value')
				.setDescription('Temp value')
				.setRequired(true)
		),
	execute: async (client, interaction) => {
		const tempUnit = interaction.options.getString('tempunit') as string;
		const tempValue = interaction.options.getNumber('temp_value') as number;
		let convertedTemp: number;

		switch (tempUnit) {
			case 'celsius':
				convertedTemp = tempValue * 1.8 + 32;
				await interaction.reply({
					content: `${bold(
						tempValue.toString() + '°C'
					)} converted to Fahrenheit is ${bold(
						convertedTemp.toString() + '°F.'
					)}`,
				}); // 100°C converted to Fahrenheit is 212°F.
				break;
			case 'fahrenheit':
				convertedTemp = Math.round((tempValue - 32) / (9 / 5));
				await interaction.reply({
					content: `${bold(
						tempValue.toString() + '°F'
					)} converted to Celsius is ${bold(convertedTemp.toString() + '°C.')}`,
				}); // 100°C converted to Fahrenheit is 212°F.
		}
	},
};
