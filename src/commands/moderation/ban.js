const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'ban',
	aliases: [],
	permissions: ['BAN_MEMBERS'],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'ban (@mention or userID) (reason)',
	exec: async (client, message, args) => {
		var user;

		if (!isNaN(args[0]) && args[0].length === 18) {
			var member =
				message.guild.members.cache.get(args[0]) ||
				message.guild.users.cache.get(args[0]) ||
				message.member;
			user = member.user;
		} else {
			user = message.mentions.users.first() || message.author;
		}

		if (!user) {
			return message.channel.send('Specify a user to ban, please.');
		}
		if (user.bot) {
			return message.channel.send("I can't ban a bot!");
		}
		if (user.id === message.author.id) {
			return message.channel.send("You can't ban yourself, dummy!");
		}
		if (!user.bannable) {
			return message.channel.send("I can't ban this user!");
		}

		let reason = args.slice(1).join(' ');

		if (!reason) {
			res = 'No reason given';
		} else {
			res = reason;
		}

		await user
			.ban(reason)
			.catch((error) =>
				message.channel.send(`Sorry, I couldn't ban because of: ${error}`)
			);

		let bean = new MessageEmbed()
			.setColor('RED')
			.setTitle(`Ban | ${user.tag}`)
			.addField('User', user, true)
			.addField('Moderator', message.author, true)
			.addField('Reason', res)
			.setTimestamp();

		message.channel.send(bean);
	},
};
