import { Command } from '../../interfaces/Command';
import { modelSchema } from '../../models/guildModel';
import { MessageEmbed } from 'discord.js';

export const command: Command = {
	name: 'help',
	aliases: ['h'],
	permissions: [],
	enabled: true,
	ownerOnly: false,
	cooldown: 0,
	usage: 'help (command)',
	execute: async (client, message, args) => {
		let data = await modelSchema.findOne({ guildID: message.guildId });
		let prefix = data.prefix;
		if (!args[0]) {
			const embed = new MessageEmbed()
				.setDescription(
					'For more information about a command, use `help <command_name>` command'
				)
				.setColor('GREEN')
				.setTimestamp(new Date());
			const help = {} as any;
			client.commands.forEach((command) => {
				// @ts-ignore
				const cat = command.module;

				if (!help.hasOwnProperty(cat)) help[cat] = [];

				help[cat].push('`' + command.name + '`');
			});

			for (let category in help) {
				embed.addField(
					`**${category.charAt(0).toUpperCase() + category.slice(1)}**`,

					help[category].join(' ')
				);
			}
			message.channel.send({ embeds: [embed] });
		} else {
			let command: any = args[0];
			if (client.commands.has(command)) {
				command =
					client.commands.get(command) ||
					client.commands.find(
						(cmd) => cmd.aliases && cmd.aliases.includes(command)
					);
				const embed = new MessageEmbed()
					.setTitle(
						command.name.charAt(0).toUpperCase() + command.name.slice(1)
					)
					.addField(
						'Aliases',
						command.aliases[0]
							? '`' + command.aliases.join('`, `') + '`'
							: 'Not Found'
					)
					.addField(
						'Required Permissions',
						command.permissions[0]
							? '```' + command.permissions.join(', ') + '```'
							: 'Not Found'
					)

					.addField(
						'Usage',
						command.usage ? prefix + command.usage : 'Not Found'
					)
					.setColor('GREEN')
					.setFooter('() - Optional, <> - Required');
				message.channel.send({ embeds: [embed] });
			} else {
				message.channel.send(
					'Command with name ' + '`' + `${command}` + '`' + ' was not found.'
				);
			}
		}
	},
};
