module.exports = {
	name: 'profile',
	aliases: ['stats'],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'profile (@mention or userID)',
	exec: async (client, message, args) => {
		const User = require('../../models/userModel.js');
		const Discord = require('discord.js');

		var messageUser;

		if (!isNaN(args[0]) && args[0].length === 18) {
			var member =
				message.guild.users.cache.get(args[0]) || message.member;
			messageUser = member.user;
		} else {
			messageUser = message.mentions.users.first() || message.author;
		}

		if (messageUser.user.bot) return message.reply(`That is a bot.`);
		let data = await User.findOne({ userID: messageUser.user.id });

		if (!data) {
			await User.create({ userID: message.author.id });
			message.channel.send(
				`Your account was created, ${message.author.username}!`
			);
		} else {
			const userStats = [
				`Balance: ${data.coins} Coins`,
				`HP: ${data.hp} Health`,
				`Level: ${data.level}`,
				`XP: ${data.xp} XP`,
				`XP to Level Up: ${data.xptoNextLevel}`,
				` `,
				`**Fish**`,
				`Salmon: ${data.fish.salmon}`,
				`Bass: ${data.fish.bass}`,
				`Eels:${data.fish.eel}`,
				`Pufferfish: ${data.fish.pufferfish}`,
			];

			const embed = new Discord.MessageEmbed()
				.setTitle(`${member.user.username}'s Stats`)
				.setDescription(userStats)
				.setFooter('Asomataru RPG System v0.2 Beta!');
			message.channel.send(embed);
		}
	},
};
