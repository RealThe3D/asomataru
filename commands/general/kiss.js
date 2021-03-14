module.exports = {
	name: 'kiss',
	aliases: [],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 3,
	usage: 'kiss (@mention or userID)',
	exec: async (client, message, args) => {
		const Discord = require('discord.js');
		const superagent = require('superagent');

		var user;

		if (!isNaN(args[0]) && args[0].length === 18) {
			var member =
				message.guild.members.cache.get(args[0]) || message.member;
			user = member.user;
		} else {
			user = message.mentions.users.first() || message.author;
		}

		let { body } = await superagent.get(
			'https://nekos.life/api/v2/img/kiss'
		);

		const kiss = new Discord.MessageEmbed()
			.setDescription(`${user.username} you got a kiss!`)
			.setColor(0x00ae86)
			.setImage(body.url);
		message.channel.send(kiss);
	},
};
