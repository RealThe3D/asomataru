import { Events, Guild } from 'discord.js';
import prisma from '@/structures/prisma.ts';
import { Event } from '@/interfaces/Event.ts';

export const event: Event = {
	type: Events.GuildCreate,
	once: false,
	on: async (_, guild: Guild) => {
		console.log(`Joined server: ${guild.name} | ${guild.id} at ${new Date()}`);
		await prisma.guild.create({
			data: {
				guildId: guild.id,
			},
		});
	},
};
