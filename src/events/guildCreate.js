const Guild = require('../models/guildModel');
const { client } = require('../index.js');

client.on('guildCreate', async (guild) => {
	let guildData = Guild.findOne({ guildID: guild.id });
	if (!guildData) {
		await guildModel.create({ guildID: guild.id });
	}
	console.log(`[JOINED GUILD]: ${guild.name} | ${guild.id}`);
});
