const { Schema, model } = require('mongoose');

// const { resources } = require('./resources/minerals.js');
// const { fish } = require('./resources/fish.js');
// const { weapons } = require('./resources/weapon.js');

const UserSchema = new Schema({
	userID: String,
	bj: {
		default: 0,
		type: Number,
	},
	betAmount: {
		default: 0,
		type: Number,
	},
	enemyBj: {
		default: 0,
		type: Number,
	},
});

module.exports = model('User', UserSchema);
