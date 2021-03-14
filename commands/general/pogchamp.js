module.exports = {
	name: 'pogchamp',
	aliases: ['poggers', 'pog'],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'pogchamp',
	exec: async (client, message, args) => {
		const Discord = require('discord.js');
		const pogLink =
			'https://banner2.cleanpng.com/20180501/feq/kisspng-twitch-emote-pogchamp-trihex-video-game-5ae91c86421878.4872230615252266302708.jpg';
		const embed = new Discord.MessageEmbed()
			.setImage(pogLink)
			.setTitle(`**Poggers!**`)
			.setFooter(`POGGERS!`);

		message.channel.send(embed);
	},
};
