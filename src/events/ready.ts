import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/rest/v9';
import ExtendedClient from '../structures/client';
import { Event } from '../interfaces/Event';
import fs from 'fs';

export const event: Event<true> = {
	name: 'ready',
	on: async (client: ExtendedClient) => {
		const TOKEN = (process.env.NODE_ENV == 'production' ? process.env.TOKEN : process.env.TEST_TOKEN) as string;
		const commandsArr = [];
		const commandFolders = fs.readdirSync('./src/commands');
		for (const folder of commandFolders) {
			const commandFiles = fs
				.readdirSync(`src/commands/${folder}`)
				.filter((file) => file.endsWith('.ts'));
			for (const file of commandFiles) {
				const { command } = await import(`../commands/${folder}/${file}`);
				command.module = folder;
				try {
					client.commands.set(command.data.name, command);
				} catch (e) {
					console.log(console.error(e));
				}
				commandsArr.push(command.data.toJSON());
			}
		}
		const rest = new REST({version: '9'}).setToken(TOKEN);
		await rest.put(Routes.applicationCommands(client.user?.id as string), { body: commandsArr }).then(() => console.log('Commands loaded!')).catch(console.error);
		console.log(`${client.user?.tag} is ready! | ${new Date()}`);
		
		client.user?.setPresence({
			status: 'online',
			activities: [{ name: 'Asomataru v3 Beta 2.1', type: 'PLAYING' }],
		});
	},
};
