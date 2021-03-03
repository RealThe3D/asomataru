const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'help',
	aliases: ['h'],
	permissions: [],
	enabled: true,
	cooldown: 5,
	exec: async (client, message, args) => {
		if (!args[0]) {
			const embed = new MessageEmbed()
				.setDescription(
					client.i18n.get(
						message.guild.language,
						'commands',
						'help_embed_title'
					)
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
			if (client.commands.has(command) || client.aliases.has(command)) {
				command =
					client.commands.get(command) || client.aliases.get(command);
				const embed = new MessageEmbed()
					.setTitle(command.name)
					.addField(
						client.i18n.get(
							message.guild.language,
							'commands',
							'help_name'
						),
						command.name
					)
					.addField(
						client.i18n.get(
							message.guild.language,
							'commands',
							'help_permissions'
						),
						command.permissions[0]
							? '```' + command.permissions.join(', ') + '```'
							: client.i18n.get(
									message.guild.language,
									'commands',
									'not_found'
							  )
					)
					.addField(
						client.i18n.get(
							message.guild.language,
							'commands',
							'help_aliases'
						),
						command.aliases[0]
							? '`' + command.aliases.join('`, `') + '`'
							: client.i18n.get(
									message.guild.language,
									'commands',
									'not_found'
							  )
					)
					.setColor('GREEN')
					.setTimestamp(new Date());
				await message.channel.send(embed);
			} else {
				message.channel.send(
					client.i18n.get(
						message.guild.language,
						'commands',
						'help_not_found',
						{ command }
					)
				);
			}
		}
	},
};
