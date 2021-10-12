import { Schema, model } from 'mongoose';

const schema = new Schema({
	guildID: {
		type: String,
		required: true,
	},
	prefix: {
		type: String,
		default: 'a!',
	},
});

export const modelSchema = model('Guild', schema);
