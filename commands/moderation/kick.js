module.exports = {
	name: 'kick',
	aliases: [],
	permissions: ['KICK_MEMBERS'],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'kick (@mention or userID) (reason)',
	exec: async (client, message, args) => {
		const Discord = require('discord.js');

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
		if (!user)
			return message.channel.send('Specify a user to kick, please.');

		if (user.bot) {
			return message.channel.send("I can't kick a bot!");
		}
		if (user.id === message.author.id) {
			return message.channel.send("You can't ban yourself, dummy!");
		}
		if (!user.kickable) {
			return message.channel.send('I cannot kick this user!');
		}

		let reason = args.slice(1).join(' ');
		if (!reason) {
			res = 'No reason given';
		} else {
			res = `${reason}`;
		}

		await member
			.kick(reason)
			.catch((error) =>
				message.reply(`Sorry, I couldn't kick because of : ${error}`)
			);

		let kick = new Discord.MessageEmbed()
			.setColor('RED')
			.setTitle(`Kick | ${member.tag}`)
			.addField('User', member, true)
			.addField('Moderator', message.author, true)
			.addField('Reason', res)
			.setTimestamp()
			.setFooter(member.id);

		message.channel.send(kick);
	},
};
