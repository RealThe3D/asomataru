const Guild = require('../models/guildModel');
module.exports = (client) => {
	client.on('guildDelete', async (guild) => {
		let guildData = Guild.findOne({ guildID: guild.id });

		if (guildData) {
			await Guild.deleteMany({ guildID: guild.id });
		}
		console.log(`[LEFT GUILD]: ${guild.name} | ${guild.id}`);
	});
};
