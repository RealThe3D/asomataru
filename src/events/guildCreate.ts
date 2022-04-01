import type { Guild } from 'discord.js';
import { Event } from '../interfaces/Event';

export const event: Event<Guild> = {
	name: 'guildCreate',
	on: (client, guild: Guild) => {
		console.log(`Joined server: ${guild.name} | ${guild.id}`);
	},
};
