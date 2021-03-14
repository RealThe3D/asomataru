const activeUsers = {};

module.exports = (client) => {
	client.on('message', async (message) => {
		const Guild = require('../models/guildModel');
		let guildData = await Guild.findOne({ guildID: message.guild.id });

		if (!guildData) {
			await Guild.create({ guildID: message.guild.id });
			return message.channel.send(
				"For some odd reason, your guild is not on our database, possibly because the bot joined when it was offline.\nAs a failsafe, your guild's data is now stored on your database.\n Please disregard for the interruption."
			);
		}
		// Guild Updater

		if (guildData && !guildData.prefix) {
			await Guild.updateMany({}, { prefix: 'a!' });
		}

		const prefix = guildData.prefix;
		const config = require('../config.json');

		if (!message.content.startsWith(prefix) || message.author.bot) return;

		const args = message.content.slice(prefix.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();

		const command =
			client.commands.get(commandName) ||
			client.commands.find(
				(cmd) => cmd.aliases && cmd.aliases.includes(commandName)
			);

		if (!command) return;

		if (command.guildOnly && message.channel.type === 'dm') {
			return message.reply("I can't execute that command inside DMs!");
		}

		if (command.permissions) {
			const authorPerms = message.channel.permissionsFor(message.author);
			if (!authorPerms || !authorPerms.has(command.permissions)) {
				return message.reply('You can not do this!');
			}
		}

		if (!command.enabled) {
			return message.channel.send('This command is disabled.');
		}
		if (command.ownerOnly && !config.OWNERS.includes(message.author.id)) {
			return message.channel.send('Only the bot owner can use this!');
		}
		if (
			command.cooldown &&
			typeof command.cooldown === 'number' &&
			command.cooldown >= 1 &&
			command.cooldown <= 86400
		) {
			if (!activeUsers.hasOwnProperty(command.name))
				activeUsers[command.name] = [];
			if (activeUsers[command.name].includes(message.author.id))
				return message.channel.send(
					`You have to wait ` +
						'`' +
						`${command.cooldown}` +
						'`' +
						` seconds to use this command again.`
				);
		}

		command.exec(client, message, args);
		if (activeUsers.hasOwnProperty(command.name)) {
			activeUsers[command.name].push(message.author.id);
			message.client.setTimeout(() => {
				activeUsers[command.name].splice(
					activeUsers[command.name].indexOf(message.author.id),
					1
				);
			}, command.cooldown * 1000);
		}
	});
};
