module.exports = {
	name: 'rps',
	aliases: ['rockpaperscissors'],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	exec: async (client, message, args) => {
		const Discord = require('discord.js');
		message
			.react('🗿')
			.then(() => message.react('📄'))
			.then(() => message.react('✂️'))
			.catch((err) => {});

		const filter = (reaction, user) => {
			return (
				['🗿', '📄', '✂️'].includes(reaction.emoji.name) &&
				user.id === message.author.id
			);
		};

		message
			.awaitReactions(filter, { max: 1, time: 10000, errors: ['time'] })
			.then((collected) => {
				const reaction = collected.first();

				if (reaction.emoji.name === '🗿') {
					var moyai = ['🗿', '📄', '✂️'];
					let moyaiembed = new Discord.MessageEmbed()
						.setColor('#6b6b6b')
						.setAuthor('Rock-Paper-Scissors')
						.setFooter(
							message.author.username,
							message.author.displayAvatarURL()
						)
						.setDescription(
							`Result... 🗿 vs ${
								moyai[Math.floor(Math.random() * moyai.length)]
							}`
						);
					message.channel.send(moyaiembed);
				}
				if (reaction.emoji.name === '📄') {
					var paper = ['🗿', '📄', '✂️'];
					let paperembed = new Discord.MessageEmbed()
						.setColor('#f2f2f2')
						.setAuthor('Rock-Paper-Scissors')
						.setFooter(
							message.author.username,
							message.author.displayAvatarURL()
						)
						.setDescription(
							`Result... 📄 vs ${
								paper[Math.floor(Math.random() * paper.length)]
							}`
						);
					message.channel.send(paperembed);
				}
				if (reaction.emoji.name === '✂️') {
					var siss = ['🗿', '📄', '✂️'];
					let sissembed = new Discord.MessageEmbed()
						.setColor('#ed5353')
						.setAuthor('Rock-Paper-Scissors')
						.setFooter(
							message.author.username,
							message.author.displayAvatarURL()
						)
						.setDescription(
							`Result... ✂️ vs ${
								siss[Math.floor(Math.random() * siss.length)]
							}`
						);
					message.channel.send(sissembed);
				}
			})
			.catch((collected) => {
				message.channel.send(
					'Query cancelled. Please select an reaction.'
				);
			});
	},
};
