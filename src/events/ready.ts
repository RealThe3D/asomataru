import { Event } from '../interfaces/Event';
import fs from 'fs';
import {
	ActivityType,
	Events,
	PresenceUpdateStatus,
	REST,
	Routes,
} from 'discord.js';

export const event: Event = {
	type: Events.ClientReady,
	once: true,
	on: async (client) => {
		const TOKEN = (
			process.env.NODE_ENV == 'production'
				? process.env.TOKEN
				: process.env.TEST_TOKEN
		) as string;
		const commandsArr = [];
		const commandFolders = fs.readdirSync('./src/commands');
		for (const folder of commandFolders) {
			// if (folder !== 'moderation') continue;
			const commandFiles = fs
				.readdirSync(`src/commands/${folder}`)
				.filter((file) => file.endsWith('.ts'));
			for (const file of commandFiles) {
				const { command } = await import(`../commands/${folder}/${file}`);
				command.module = folder;
				try {
					client.commands.set(command.data.name, command);
				} catch (e) {
					console.error(e);
				}
				commandsArr.push(command.data.toJSON());
			}
		}
		const rest = new REST({ version: '10' }).setToken(TOKEN);

		try {
			await rest.put(Routes.applicationCommands(client.user?.id as string), {
				body: commandsArr,
			});
			console.log('Commands loaded!');
		} catch (e) {
			console.error(e);
		}

		console.log(`${client.user?.tag} is ready! | ${new Date()}`);
		client.user?.setPresence({
			status: PresenceUpdateStatus.Online,
			activities: [
				{ name: 'Asomataru v3 Beta Phase 4', type: ActivityType.Playing },
			],
		});
	},
};
