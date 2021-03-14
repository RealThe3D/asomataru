const Discord = require('discord.js');

const mongoose = require('mongoose');
const db = mongoose.connection;

const TOKEN = process.env.BOT_TOKEN;
const config = require('./config.json');

const client = new Discord.Client();

mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

db.once('open', () => {
	require('./models/index');
	require('./handlers/eventHandler')(client);
	require('./handlers/moduleHandler')(client);
});

db.on('error', (err) => {
	throw err;
});

client.login(TOKEN);
