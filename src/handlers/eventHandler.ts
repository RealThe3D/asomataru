import * as fs from 'fs';

const events = fs
	.readdirSync('./events')
	.filter((file: any) => file.endsWith('.js'));

for (const event of events) {
	require(`../events/${event}`);
}
