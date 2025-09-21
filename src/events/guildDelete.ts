import { Events, Guild } from 'discord.js';
import { Event } from '@/interfaces/Event.ts';
import { eq } from 'drizzle-orm';
import { db, guilds as guildsTable } from '@/db/index.ts';

export const event: Event = {
	type: Events.GuildDelete,
	once: false,
	on: async (_, guild: Guild) => {
		console.log(
			`Left server: ${guild.name} | ${guild.id} at ${new Date()}`
		);

		await db.delete(guildsTable).where(eq(guildsTable.id, guild.id));
	},
};
