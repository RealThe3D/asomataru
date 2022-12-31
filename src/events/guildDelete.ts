import { Events, Guild } from 'discord.js';
import { Event } from '../interfaces/Event';

export const event: Event<Guild> = {
	type: Events.GuildDelete,
	on: (client, guild: Guild) => {
		console.log(`Left server: ${guild.name} | ${guild.id}`);
	},
};
