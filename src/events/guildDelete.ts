import { Events, Guild } from 'discord.js';
import { Event } from '../interfaces/Event';
import Asomataru from '../structures/client';

export const event: Event = {
	type: Events.GuildDelete,
	on: (client, guild: Guild) => {
		console.log(`Left server: ${guild.name} | ${guild.id}`);
	},
};
