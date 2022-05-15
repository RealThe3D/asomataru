import type { Client } from 'discord.js';
import { Event } from '../interfaces/Event';

export const event: Event<true> = {
	name: 'ready',
	on: (client: Client) => {
		console.log(`${client.user?.tag} is ready! | ${new Date()}`);
		client.user?.setPresence({
			status: 'online',
			activities: [{ name: 'Asomataru v3 Beta 2', type: 'PLAYING' }],
		});
	},
};
