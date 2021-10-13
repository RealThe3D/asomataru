import { Client } from 'discord.js';
import { Event } from '../interfaces/Event';

export const event: Event = {
	name: 'ready',
	on: (client: Client) => {
		console.log(`${client.user?.tag} is ready! | ${new Date()}`);
		client.user?.setPresence({
			status: 'online',
			activities: [{ name: 'Asomataru v3 Beta', type: 'PLAYING' }],
		});
	},
};
