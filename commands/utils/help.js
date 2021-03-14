module.exports = {
	name: 'help',
	aliases: ['h'],
	permissions: [],
	enabled: true,
	ownerOnly: false,
	cooldown: 0,
	usage: 'help (command)',
	exec: async (client, message, args) => {
		const Discord = require('discord.js');
		const Guild = require('../../models/guildModel');

		const guildData = await Guild.findOne({ guildID: message.guild.id });
		const prefix = guildData.prefix;

		if (!args[0]) {
			const embed = new Discord.MessageEmbed()
				.setDescription(
					'For more information about a command, use `help <command_name>` command'
				)
				.setColor('GREEN')
				.setTimestamp(new Date());
			const help = {};
			client.commands.forEach((command) => {
				const cat = command.module;
				if (!help.hasOwnProperty(cat)) help[cat] = [];
				help[cat].push('`' + command.name + '`');
			});
			let str = '';
			for (let category in help) {
				embed.addField(
					`**${
						category.charAt(0).toUpperCase() + category.slice(1)
					}**`,
					help[category].join(' | ')
				);
			}
			await message.channel.send(embed);
		} else {
			let command = args[0];
			if (client.commands.has(command)) {
				command =
					client.commands.get(command) || client.aliases.get(command);
				const embed = new Discord.MessageEmbed()
					.setTitle(command.name)
					.addField('Name', command.name)
					.addField(
						'Required Permissions',
						command.permissions[0]
							? '```' + command.permissions.join(', ') + '```'
							: 'Not Found'
					)
					.addField(
						'Aliases',
						command.aliases[0]
							? '`' + command.aliases.join('`, `') + '`'
							: 'Not Found'
					)
					.addField(
						'Usage',
						command.usage ? prefix + command.usage : 'Not Found'
					)
					.setColor('GREEN')
					.setFooter('() - Optional, <> - Required');
				await message.channel.send(embed);
			} else {
				message.channel.send(
					'Command with name ' +
						'`' +
						`${command}` +
						'`' +
						' was not found.'
				);
			}
		}
	},
};
