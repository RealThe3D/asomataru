import { Event } from '../interfaces/Event';

export const event: Event = {
	name: 'ready',
	on: (client) => {
		console.log(`${client.user?.tag} is ready! | ${new Date()}`);
	},
};
