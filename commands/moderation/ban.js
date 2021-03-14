module.exports = {
	name: 'ban',
	aliases: [],
	permissions: ['BAN_MEMBERS'],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	exec: async (client, message, args) => {
		const Discord = require('discord.js');
		let xdemb = new Discord.MessageEmbed()
			.setColor('#000000')
			.setTitle('Ban Command')
			.addField('Description:', `Ban a member`, true)
			.addField('Usage:', `!ban [user] [reason]`, true)
			.addField('Example:', `!ban @user spam`);

		const member =
			message.mentions.users.first() || message.guild.users.get(args[0]);

		if (!member) {
			return message.channel.send('Specify a user to ban, please.');
		}
		if (member.bot) {
			return message.channel.send("I can't ban a bot!");
		}
		if (!member.bannable)
			return message.channel.send("I can't ban this user!");

		if (member.id === message.author.id)
			return message.channel.send("You can't ban your self");

		let reason = args.slice(1).join(' ');

		if (!reason) {
			res = 'No reason given';
		} else {
			res = reason;
		}

		await member
			.ban(reason)
			.catch((error) =>
				message.channel.send(
					`Sorry, I couldn't ban because of: ${error}`
				)
			);

		let bean = new Discord.MessageEmbed()
			.setColor('RED')
			.setTitle(`Ban | ${member.tag}`)
			.addField('User', member, true)
			.addField('Moderator', message.author, true)
			.addField('Reason', res)
			.setTimestamp();

		message.channel.send(bean);
	},
};
