module.exports = {
	name: 'avatar',
	aliases: [],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 2,
	usage: 'avatar (@mention or userID)',
	exec: async (client, message, args) => {
		const Discord = require('discord.js');

		if (message.author.bot) return;

		const author = message.author;
		const PUser = args.member.member.user;
		const AvatarEmbed = new Discord.MessageEmbed();

		if (!args.member || args.member.id == message.author.id) {
			AvatarEmbed.setTitle(`${author.username} Avatar!`);
			AvatarEmbed.setImage(author.avatarURL());
		} else {
			AvatarEmbed.setTitle(`${PUser.username} Avatar!`);
			AvatarEmbed.setImage(PUser.avatarURL());
		}
		AvatarEmbed.setColor('RANDOM');
		message.channel.send(AvatarEmbed);
	},
};
