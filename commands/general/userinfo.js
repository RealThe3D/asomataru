module.exports = {
	name: 'userinfo',
	aliases: ['user'],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'userinfo (@mention or userID)',
	exec: async (client, message, args) => {
		const Discord = require('discord.js');

		let inline = true;
		const status = {
			online: 'Online',
			idle: 'Idle',
			dnd: 'Do Not Disturb',
			offline: 'Offline/Invisible',
		};

		var user;

		if (!isNaN(args[0]) && args[0].length === 18) {
			var member =
				message.guild.users.cache.get(args[0]) ||
				message.guild.members.cache.get(args[0]) ||
				message.member;
			user = member.user;
		} else {
			user = message.mentions.users.first() || message.author;
		}

		if (user.bot === true) {
			var bot = 'Yes';
		} else {
			var bot = 'No';
		}
		var embed = new Discord.MessageEmbed()
			.setThumbnail(user.displayAvatarURL)
			.setColor('#00ff00')
			.addField('Full username', `${user.tag}`, inline)
			.addField('ID', user.id, inline)
			.addField(
				'Nickname',
				`${user.nickname !== null ? `${user.nickname}` : 'None'}`,
				true
			)
			.addField('Bot', `${bot}`, inline, true)
			.addField('Status', `${status[user.presence.status]}`, inline, true)
			.addField('Joined Discord At', user.createdAt)
			.setFooter(`Information about ${user.username}`)
			.setTimestamp();
		message.channel.send(embed);
	},
};
