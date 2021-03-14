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

		var user;

		if (!isNaN(args[0]) && args[0].length === 18) {
			var member =
				message.guild.members.cache.get(args[0]) || message.member;
			user = member.user;
		} else {
			user = message.mentions.users.first() || message.author;
		}
		if (member.user.bot) {
			const botEmbed = new Discord.MessageEmbed()
				.setTitle(`${member.user.username}'s Avatar`)
				.setImage(
					member.user.displayAvatarURL({
						size: 512,
						format: 'jpg',
						dynamic: true,
					})
				);
		} else {
			const embed = new Discord.MessageEmbed()
				.setTitle(`${user.username}'s Avatar`)
				.setImage(
					user.displayAvatarURL({
						size: 512,
						format: 'jpg',
						dynamic: true,
					})
				);

			message.channel.send(embed);
		}
	},
};
