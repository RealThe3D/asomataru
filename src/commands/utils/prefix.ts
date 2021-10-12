import { MessageEmbed } from 'discord.js';
import { Command } from '../../interfaces/Command';
import { modelSchema } from '../../models/guildModel';

export const command: Command = {
	name: 'prefix',
	aliases: ['p'],
	permissions: ['BAN_MEMBERS'],
	enabled: true,
	cooldown: 3,
	usage: 'prefix <prefix>',
	ownerOnly: false,
	execute: async (client, message, args) => {
		let guildData = await modelSchema.findOne({ guildID: message.guildId });
		let embed = new MessageEmbed();
		if (!args[0]) {
			embed.setTitle('No Arguments');
			embed.setColor('RED');
			embed.setDescription('Please specify a prefix!');
		}
		if (args[0].length > 5) {
			embed.setTitle('Prefix is too long!');
			embed.setColor('RED');
			embed.setDescription('Can you make the prefix shorter?');
		} else if (args[0]) {
			guildData.prefix = args[0];
			guildData.save();
			embed.setTitle('Success!');
			embed.setColor('GREEN');
			embed.setDescription(`Success! The new prefix is ${guildData.prefix}`);
		}
		message.channel.send({ embeds: [embed] });
	},
};
