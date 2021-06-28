const fs = require('fs');

const events = fs
	.readdirSync('./events')
	.filter((file) => file.endsWith('.js'));

for (const event of events) {
	require(`../events/${event}`);
}
