module.exports = {
	name: 'prefix',
	aliases: ['p'],
	permissions: ['BAN_MEMBERS'],
	enabled: true,
	cooldown: 3,
	exec: async (client, message, args) => {
		const Discord = require('discord.js');

		const Guild = require('../../models/guildModel');
		let guildData = Guild.findOne({ guildID: message.guild.id });

		if (!args[0]) {
			const noArgsEmbed = new Discord.MessageEmbed()
				.setTitle('No Arguments')
				.setColor('RED')
				.setDescription('Please specify a prefix!');

			message.channel.send(noArgsEmbed);
		}
		if (args[0].length > 5) {
			const lengthyPrefix = new Discord.MessageEmbed()
				.setTitle('Prefix is too long!')
				.setColor('RED')
				.setDescription('Can you make the prefix shorter?');

			message.channel.send(lengthyPrefix);
		} else if (args[0]) {
			guildData.prefix = args[0];
			guildData.save();
			const successEmbed = new Discord.MessageEmbed()
				.setTitle('Success!')
				.setColor('00FF00')
				.setDescription(
					`Success! The new prefix is ${guildData.prefix}`
				);

			message.channel.send(successEmbed);
		}
	},
};
