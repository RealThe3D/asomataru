const Discord = require('discord.js');
const client = new Discord.Client();

const mongoose = require('mongoose');
const db = mongoose.connection;

const TOKEN = process.env.BOT_TOKEN;
const url = process.env.MONGODB_URI;

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

db.once('open', () => {
	require('./models/index.js');
	require('./handlers/commandHandler.js')(client);
	require('./handlers/eventHandler.js')(client);
});

db.on('error', (err) => {
	throw err;
});

client.login(TOKEN);
