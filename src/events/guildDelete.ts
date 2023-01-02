import { Events, Guild } from 'discord.js';
import { Event } from '../interfaces/Event';

export const event: Event = {
	type: Events.GuildDelete,
	on: (guild: Guild) => {
		console.log(`Left server: ${guild.name} | ${guild.id}`);
	},
};
