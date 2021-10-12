import { Guild } from 'discord.js';
import { Event } from '../interfaces/Event';

export const event: Event = {
	name: 'guildDelete',
	on: (client, guild: Guild) => {
		console.log(`Left server: ${guild.name} | ${guild.id}`);
	},
};
