module.exports = {
	name: 'avatar',
	aliases: [],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 2,
	usage: 'avatar (@mention or userID)',
	exec: (client, message, args) => {
		const Discord = require('discord.js');

		if (message.author.bot) return;

		if (!isNaN(args[0]) && args[0].length === 18) {
			var member =
				message.guild.members.cache.get(args[0]) || message.member;
			user = member.user;
		} else {
			AvatarEmbed.setTitle(`${PUser.username} Avatar!`);
			AvatarEmbed.setImage(PUser.avatarURL());
		}
		AvatarEmbed.setColor('RANDOM');
		message.channel.send(AvatarEmbed);
	},
};
