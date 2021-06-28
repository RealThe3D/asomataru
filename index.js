const { Client } = require('discord.js');
const mongoose = require('mongoose');

const client = new Client();
const db = mongoose.connection;

const TOKEN = process.env.BOT_TOKEN;
const url = process.env.MONGODB_URI;

mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(
		require('./models/index.js'),
		require('./handlers/commandHandler.js')(client),
		require('./handlers/eventHandler.js')(client)
	);

db.on('error', (err) => {
	throw err;
});

client.login(TOKEN);
