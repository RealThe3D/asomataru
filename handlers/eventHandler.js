const fs = require('fs');
const { client } = require('../index.js');

const events = fs
	.readdirSync('./events')
	.filter((file) => file.endsWith('.js'));

for (const event of events) {
	require(`../events/${event}`)(client);
}
