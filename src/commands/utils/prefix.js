const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'prefix',
	aliases: ['p'],
	permissions: ['BAN_MEMBERS'],
	enabled: true,
	cooldown: 3,
	usage: 'prefix <prefix>',
	exec: async (client, message, args) => {
		const Guild = require('../../models/guildModel');
		let guildData = await Guild.findOne({ guildID: message.guild.id });

		const embed = new MessageEmbed();

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
			embed.setColor('00FF00');
			embed.setDescription(`Success! The new prefix is ${guildData.prefix}`);
		}
		message.channel.send(embed);
	},
};
