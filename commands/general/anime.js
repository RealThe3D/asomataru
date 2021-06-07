module.exports = {
	name: 'anime',
	aliases: ['waifu'],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 5,
	usage: 'anime',
	exec: async (client, message, args) => {
		const Discord = require('discord.js');
		const axios = require('axios');

		let { data } = await axios.get('https://nekos.life/api/v2/img/waifu');

		const embed = new Discord.MessageEmbed()
			.setTitle(`**Here is an waifu! OwO**`)
			.setImage(data.url)
			.setFooter('Powered by nekos.life');

		message.channel.send(embed);
	},
};
