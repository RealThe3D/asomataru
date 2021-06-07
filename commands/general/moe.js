module.exports = {
	name: 'moemorphism',
	aliases: ['moe'],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'moemorphism',
	exec: async (client, message, args) => {
		const Discord = require('discord.js');
		const axios = require('axios');
		let { body } = await axios.get(
			'https://meme-api.herokuapp.com/gimme/moemorphism'
		);

		const embed = new Discord.MessageEmbed()
			.setImage(body.url)
			.setTitle(`**__Moemorphism__**`)
			.setURL(`https://reddit.com/r/${body.subreddit}`)
			.setFooter(`From r/${body.subreddit}`);

		message.channel.send(embed);
	},
};
