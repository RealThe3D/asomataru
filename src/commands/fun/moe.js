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
		let { data } = await axios.get(
			'https://meme-api.herokuapp.com/gimme/moemorphism'
		);

		const embed = new Discord.MessageEmbed()
			.setImage(data.url)
			.setTitle(`**__Moemorphism__**`)
			.setURL(`https://reddit.com/r/${data.subreddit}`)
			.setFooter(`From r/${data.subreddit}`);

		message.channel.send(embed);
	},
};
