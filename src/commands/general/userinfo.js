const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'userinfo',
	aliases: ['user'],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'userinfo (@mention or userID)',
	exec: (client, message, args) => {
		const status = {
			online: 'Online',
			idle: 'Idle',
			dnd: 'Do Not Disturb',
			offline: 'Offline/Invisible',
		};

		var isBot;
		var user;

		if (!isNaN(args[0]) && args[0].length === 18) {
			var member = message.guild.members.cache.get(args[0]) || message.member;
			user = member.user;
		} else {
			user = message.mentions.users.first() || message.author;
		}

		if (user.bot === true) {
			isBot = 'Yes';
		} else {
			isBot = 'No';
		}
		var embed = new MessageEmbed()
			.setThumbnail(user.displayAvatarURL)
			.setColor('#00ff00')
			.addField('Full username', `${user.tag}`, true)
			.addField('ID', user.id, true)
			.addField('Nickname', user.nickname ? user.nickname : 'None', true)
			.addField('Bot', `${isBot}`, true)
			.addField('Status', `${status[user.presence.status]}`, true)
			.addField('Joined Discord on', user.createdAt)
			.setFooter(`Information about ${user.username}`)
			.setTimestamp();
		message.channel.send(embed);
	},
};
