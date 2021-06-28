const { Client } = require('discord.js');
const mongoose = require('mongoose');
const db = mongoose.connection;
const client = new Client();
const TOKEN = process.env.BOT_TOKEN;
const url = process.env.MONGODB_URI;
exports.client = client;

mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(
		require('./models/index.js'),
		require('./handlers/commandHandler.js'),
		require('./handlers/eventHandler.js')
	);

db.on('error', (err) => {
	console.log(err);
});

client.login(TOKEN);
