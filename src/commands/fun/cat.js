module.exports = {
	name: 'cat',
	aliases: ['meow'],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'cat',
	exec: async (client, message, args) => {
		const Discord = require('discord.js');
		const axios = require('axios');

		let { data } = await axios.get('http://aws.random.cat/meow');

		const embed = new Discord.MessageEmbed()
			.setTitle(`**__Who is a good cuddly kitten!__**`)
			.setImage(data.file)
			.setFooter(`Powered by aws.random.cat API`);

		message.channel.send(embed);
	},
};
