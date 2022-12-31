import { Events, Guild } from 'discord.js';
import prisma from '../structures/prisma';
import { Event } from '../interfaces/Event';

export const event: Event<Guild> = {
	type: Events.GuildCreate,
	on: async (client, guild: Guild) => {
		console.log(`Joined server: ${guild.name} | ${guild.id}`);
		await prisma.guild.create({
			data: {
				guildId: guild.id,
			},
		});
	},
};
