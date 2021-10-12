import { MessageEmbed } from 'discord.js';
import { Command } from '../../interfaces/Command';
import { inspect } from 'util';

export const command: Command = {
	name: 'eval',
	aliases: [],
	permissions: [],
	ownerOnly: true,
	enabled: true,
	cooldown: 0,
	usage: 'eval <code>',
	execute: async (client, message, args) => {
		const embed = new MessageEmbed().setTitle('Evaluating...');
		try {
			const code = args.join(' ').replace(/`/g, '');
			let evaled = eval(code);
			if (typeof evaled !== 'string') {
				evaled = inspect(evaled);
			}

			embed.setColor('GREEN');
			embed.addField('Input', `\`\`\`js\n${code}\`\`\``, false);
			embed.addField('Output', `\`\`\`js\n${evaled}\`\`\``, false);
		} catch (e: any) {
			embed.setColor('RED');
			embed.addField('Error', `\`\`\`js\n${e}\`\`\``, false);
		}

		message.channel.send({ embeds: [embed] });
	},
};
