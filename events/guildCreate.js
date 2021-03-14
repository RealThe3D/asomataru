const Guild = require('../models/guildModel');
module.exports = (client) => {
	client.on('guildCreate', async (guild) => {
		let guildData = Guild.findOne({ guildID: guild.id });
		if (!guildData) {
			await guildModel.create({ guildID: guild.id });
		}
		console.log(`[JOINED GUILD]: ${guild.name} | ${guild.id}`);
	});
};
