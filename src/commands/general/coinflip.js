const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'coinflip',
	aliases: ['coin'],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'coinflip',
	exec: async (client, message, args) => {
		const embed = new MessageEmbed();
		const choices = ['on heads!', 'on tails!'];
		const coinResult = choices[Math.floor(Math.random() * choices.length)];

		embed.setTitle(`${message.author.username} flipped a coin!`);
		embed.addField('Result: ', 'You have landed ' + coinResult, false);

		message.channel.send(embed);
	},
};
