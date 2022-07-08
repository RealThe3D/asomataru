import { Command } from '../../interfaces/Command';
import { MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

export const command: Command = {
	name: 'help',
	permissions: [],
	enabled: true,
	ownerOnly: false,
	cooldown: 0,
	usage: 'help (command)',
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Displays help')
		.addStringOption((option) => option.setName('command').setDescription('Name of command')),
	execute: async (client, interaction) => {
		const cmdValue = interaction.options.getString('command');
		if (!cmdValue) {
			const embed = new MessageEmbed()
				.setDescription(
					'For more information about a command, use `help <command_name>` command'
				)
				.setColor('GREEN')
				.setTimestamp(new Date());
			const help = {} as any;
			client.commands.forEach((command) => {
				// @ts-expect-error idk
				const cat = command.module; 

				if (!help.hasOwnProperty(cat)) help[cat] = [];

				help[cat].push('`' + command.name + '`');
			});

			for (const category in help) {
				embed.addField(
					`**${category.charAt(0).toUpperCase() + category.slice(1)}**`,

					help[category].join(' ')
				);
			}
			interaction.reply({ embeds: [embed], ephemeral: true });
		} else {
			let command: any = cmdValue;
			if (client.commands.has(command)) {
				command =
					client.commands.get(command);
				const embed = new MessageEmbed()
					.setTitle(
						command.data.name.charAt(0).toUpperCase() + command.name.slice(1)
					)
					.addField(
						'Required Permissions',
						command.permissions[0]
							? '```' + command.permissions.join(', ') + '```'
							: 'Not Found'
					)

					.addField(
						'Usage',
						command.usage ? command.usage : 'Not Found'
					)
					.setColor('GREEN')
					.setFooter('() - Optional, <> - Required');
				interaction.reply({ embeds: [embed], ephemeral: true });
			} else {
				interaction.reply({content: 'Command with name ' + '`' + `${command}` + '`' + ' was not found.', ephemeral: true});
			}
		}
	},
};
