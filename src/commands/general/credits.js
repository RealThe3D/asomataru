const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'credits',
	aliases: ['halloffame'],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'credits',
	exec: async (client, message, args) => {
		const credits = [
			'Davska#6229 - Pro smash player, and loves the Sinnoh region! Happy about the announced remakes!',
			'Kandrina#1426 - Lovely woman from Austria, but plays too much Genshin!',
			"Akashic Bearer#2305 - A discord bot programmer who totally doesn't have a better bot then me.",
			'Mochi#7342 - Cool person, loves to eat mochi.',
			'Dr. Mathew#6718, worthy player and waifu!',
			'Incineroar#7934 - Fatal memer and pro smash player',
			'SteelyMite#6098 - Busy with schoolwork but can manage to tell me oyasumi',
			'SirSailor Star#3528 - Loves Xenoblade and Fire Emblem!',
			"Daniel Diaz#9198 - Luxembourg's flag looks like aquafresh.",
			'InfiniteTime#0463 aka Asomataru-Chan, the person this bot is named after! Subscribe to their YouTube and Twitch!',
			'Mirjan#9930 - Fatal memer!',
		];
		const creditsEmbed = new MessageEmbed()
			.setColor('FFFFFF')
			.setTitle(`A dedication to my friends!`)
			.setDescription(credits);
		message.channel.send(creditsEmbed);
	},
};
