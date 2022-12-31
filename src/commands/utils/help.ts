import { Command } from '../../interfaces/Command';
import { Colors, EmbedBuilder, SlashCommandBuilder } from 'discord.js';

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
		.addStringOption((option) =>
			option.setName('command').setDescription('Name of command')
		),
	execute: async (client, interaction) => {
		const cmdValue = interaction.options.getString('command');
		if (!cmdValue) {
			const embed = new EmbedBuilder()
				.setDescription(
					'For more information about a command, use `help <command_name>` command'
				)
				.setColor(Colors.Green)
				.setTimestamp(new Date());
			const help = {} as any;
			client.commands.forEach((command) => {
				// @ts-expect-error idk
				const cat = command.module;

				if (!help.hasOwnProperty(cat)) help[cat] = [];

				help[cat].push('`' + command.name + '`');
			});

			for (const category in help) {
				embed.setFields([
					{
						name: `**${category.charAt(0).toUpperCase() + category.slice(1)}**`,

						value: help[category].join(' '),
					},
				]);
			}
			interaction.reply({ embeds: [embed], ephemeral: true });
		} else {
			let command: any = cmdValue;
			if (client.commands.has(command)) {
				command = client.commands.get(command);
				const embed = new EmbedBuilder()
					.setTitle(
						command.data.name.charAt(0).toUpperCase() + command.name.slice(1)
					)
					.setFields([
						{
							name: 'Required Permissions',
							value: command.permissions[0]
								? '```' + command.permissions.join(', ') + '```'
								: 'Not Found',
						},
						{
							name: 'Usage',
							value: command.usage ? command.usage : 'Not Found',
						},
					])
					.setColor(Colors.Green)
					.setFooter({ text: '() - Optional, <> - Required' });
				interaction.reply({ embeds: [embed], ephemeral: true });
			} else {
				interaction.reply({
					content:
						'Command with name ' + '`' + `${command}` + '`' + ' was not found.',
					ephemeral: true,
				});
			}
		}
	},
};
