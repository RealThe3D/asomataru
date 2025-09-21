import { Events, Guild } from 'discord.js';
import { Event } from '@/interfaces/Event.ts';
import { db, guilds as guildsTable } from '@/db/index.ts';

export const event: Event = {
	type: Events.GuildCreate,
	once: false,
	on: async (_, guild: Guild) => {
		console.log(
			`Joined server: ${guild.name} | ${guild.id} at ${new Date()}`
		);

		await db.insert(guildsTable).values({
			id: guild.id,
		});
	},
};
