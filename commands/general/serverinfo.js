module.exports = {
	name: 'serverinfo',
	aliases: [],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'serverinfo',
	exec: async (client, message, args) => {
		const Discord = require('discord.js');
		const veriLevel = {
			NONE: 'None',
			LOW: 'Low',
			MEDIUM: 'Medium',
			HIGH: '(╯°□°）╯︵ ┻━┻',
			VERY_HIGH: '(ノಠ益ಠ)ノ彡┻━┻',
		};

		let serverEmbed = new Discord.MessageEmbed()
			.setColor('#00ff00')
			.setThumbnail(message.guild.iconURL)
			.setAuthor(message.guild.name)
			.addField('Name', message.guild.name, true)
			.addField('ID', message.guild.id, true)
			.addField('Owner', message.guild.owner, true)
			.addField('Region', message.guild.region, true)
			.addField('Verification Level', veriLevel[message.guild.verificationLevel], true)
			.addField('Members', `${message.guild.memberCount}`, true)
			.addField('Roles', message.guild.roles.cache.size, true)
			.addField('Channels', message.guild.channels.cache.size, true)
			.addField('You Joined', message.member.joinedAt)
			.setFooter(`Created ${message.guild.createdAt}`);

		message.channel.send(serverEmbed);
	},
};
