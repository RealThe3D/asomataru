const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'uselessfact',
	aliases: ['uf'],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 3,
	usage: 'uselessfact',
	exec: async (client, message, args) => {
		const axios = require('axios');

		let { data } = await axios.get(
			'https://uselessfacts.jsph.pl/random.json?language=en'
		);

		const embed = new MessageEmbed()
			.setTitle(`**__Useless Fact!__**`)
			.setDescription(data.text)
			.setFooter(`Powered by uselessfacts.jsph.pl`);

		message.channel.send(embed);
	},
};
