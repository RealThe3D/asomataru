module.exports = {
	name: 'kiss',
	aliases: [],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 3,
	usage: 'kiss (@mention or userID)',
	exec: async (client, message, args) => {
		const { MessageEmbed } = require('discord.js');
		const superagent = require('superagent');
		const member = message.mentions.users.first() || message.member;
		const embed = new MessageEmbed()
			.setDescription(`${member.username} you got a kiss!`)
			.setColor(0x00ae86)
			.setImage(body.url);

		let userData = await User.findOne({ userID: message.author.id });

		if (!userData) {
			return message.channel.send('No data on you! Use a!profile');
		}
		let { body } = await superagent.get(
			'https://nekos.life/api/v2/img/kiss'
		);

		if (member.id == message.author.id) {
			embed.setTitle(`They.. kissed themselves?`);
		} else {
			embed.setTitle(`${message.author.id} kissed ${member.username}!`);
			userData.affection += 5;
			userData.save();
			embed.setFooter(
				`You've gained 5 affection for being generous! You now have ${userData.affection} Affection!`
			);
		}

		message.channel.send(kiss);
	},
};
