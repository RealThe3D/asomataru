const { Schema, model } = require('mongoose');

const guildSchema = new Schema({
	guildID: {
		type: String,
		required: true,
	},
	prefix: {
		type: String,
		default: 'a!',
	},
});

module.exports = model('guildModel', guildSchema, 'GUILD_COLLECTION');
