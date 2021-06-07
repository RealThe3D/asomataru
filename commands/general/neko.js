module.exports = {
	name: 'neko',
	aliases: [],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'neko',
	exec: async (client, message, args) => {
		const Discord = require('discord.js');
		const axios = require('axios');

		let { body } = await axios.get('https://nekos.life/api/v2/img/neko');

		const embed = new Discord.MessageEmbed()
			.setTitle(`**Here is a neko! UwU**`)
			.setImage(body.url)
			.setFooter('Powered by nekos.life');

		message.channel.send(embed);
	},
};
