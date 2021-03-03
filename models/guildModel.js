const { Schema, model } = require('mongoose');

const guildSchema = Schema({
	guildID: {
		type: String,
		required: true,
	},
	language: {
		type: String,
		required: true,
		default: 'en',
	},
});

module.exports = model('guildModel', guildSchema, 'GUILD_COLLECTION');
