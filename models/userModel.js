const { Schema, model } = require('mongoose');

// const { resources } = require('./resources/minerals.js');
// const { fish } = require('./resources/fish.js');
// const { weapons } = require('./resources/weapon.js');

const UserSchema = new Schema({
	userID: String,
	bj: Number,
	betAmount: Number,
	enemyBj: Number,
});

module.exports = model('User', UserSchema);
