import { Schema, model } from 'mongoose';

const schema = new Schema({
	userID: String,
	coins: {
		default: 0,
		type: Number,
	},
	affection: {
		default: 0,
		type: Number,
	},
	bj: Number,
	betAmount: Number,
	enemyBj: Number,
});

export const modelSchema = model('User', schema);
