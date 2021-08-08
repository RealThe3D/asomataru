const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
	name: 'neko',
	aliases: [],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'neko',
	exec: async (client, message, args) => {
		let { data } = await axios.get(
			'https://meme-api.herokuapp.com/gimme/birds'
		);

		const embed = new MessageEmbed()
			.setTitle(`**Here is a bird! Soar my little friend!**`)
			.setImage(data.url)
			.setFooter('From Reddit');

		message.channel.send(embed);
	},
};
