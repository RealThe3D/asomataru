module.exports = {
	name: 'dog',
	aliases: ['doggo'],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'dog',
	exec: async (client, message, args) => {
		const Discord = require('discord.js');
		const axios = require('axios');

		let { body } = await axios.get('https://random.dog/woof.json');

		const embed = new Discord.MessageEmbed()
			.setTitle(`**__Who is a good doggo!__**`)
			.setImage(body.url)
			.setFooter(`Powered by random.dog API`);

		message.channel.send(embed);
	},
};
