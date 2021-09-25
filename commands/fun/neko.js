const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'neko',
	aliases: [],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'neko',
	exec: async (client, message, args) => {
		const axios = require('axios');
		let { data } = await axios.get('https://nekos.life/api/v2/img/neko');

		const embed = new MessageEmbed()
			.setTitle(`**Here is a neko! UwU**`)
			.setImage(data.url)
			.setFooter('Powered by nekos.life');

		message.channel.send(embed);
	},
};
