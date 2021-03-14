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

		const member =
			message.mentions.members.first() ||
			message.guild.members.get(args[0]);

		//let member = message.mentions.members.first();
		if (!member)
			return message.channel.send('Specify a user to kick, please.');

		if (!member.kickable)
			return message.channel.send('I cannot kick this user!');

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
			.setColor('#000000')
			.setTitle(`Kick | ${member.user.tag}`)
			.addField('User', member, true)
			.addField('Moderator', message.author, true)
			.addField('Reason', res)
			.setTimestamp()
			.setFooter(member.id);

		message.channel.send(kick);
	},
};
