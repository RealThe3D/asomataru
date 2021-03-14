module.exports = (client) => {
	const fs = require('fs');
	const Discord = require('discord.js');

	client.commands = new Discord.Collection();

	const commandFolders = fs.readdirSync('./commands');

	for (const folder of commandFolders) {
		const commandFiles = fs
			.readdirSync(`./commands/${folder}`)
			.filter((file) => file.endsWith('.js'));
		for (const file of commandFiles) {
			const command = require(`../commands/${folder}/${file}`);
			command.module = folder;
			client.commands.set(command.name, command);
		}
	}
};
