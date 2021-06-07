module.exports = {
	name: 'joke',
	aliases: [],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 3,
	usage: 'joke',
	exec: async (client, message, args) => {
		const Discord = require('discord.js');
		const axios = require('axios');
		let data = axios
			.get('https://v2.jokeapi.dev/joke/Any?safe-mode&type=single')
			.then((res) => console.log(res.data));
		console.log(data);

		const embed = new Discord.MessageEmbed()
			.setTitle('Stand-up Comedian Joke!')
			.setDescription(data.joke)
			.setFooter('Powered by JokeAPI');

		message.channel.send(embed);
	},
};
