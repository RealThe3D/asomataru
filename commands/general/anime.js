module.exports = {
	name: 'anime',
	aliases: ['waifu'],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 5,
	exec: async (client, message, args) => {
		const Discord = require('discord.js');
		const superagent = require('superagent');

		let { body } = await superagent.get(
			'https://nekos.life/api/v2/img/waifu'
		);

		const embed = new Discord.MessageEmbed()
			.setTitle(`**Here is an waifu! OwO**`)
			.setImage(body.url)
			.setFooter('Powered by nekos.life');

		message.channel.send(embed);
	},
};
