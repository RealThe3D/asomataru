import { Events, Guild } from 'discord.js';
import { Event } from '@/interfaces/Event.ts';

export const event: Event = {
	type: Events.GuildDelete,
	once: false,
	on: (_, guild: Guild) => {
		console.log(`Left server: ${guild.name} | ${guild.id} at ${new Date()}`);
	},
};
