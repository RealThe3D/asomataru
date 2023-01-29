import { Client, Collection, GatewayIntentBits, Snowflake } from 'discord.js';
import fs from 'fs';
import { Command } from '../interfaces/Command';
import { Event } from '../interfaces/Event';
import { config } from 'dotenv';
config();

class Asomataru extends Client {
	commands: Collection<string, Command> = new Collection();
	events: Collection<string, Event> = new Collection();
	cooldowns: Collection<string, Collection<Snowflake, number>> =
		new Collection();

	constructor(
		intents = [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
	) {
		super({ intents });
	}
	async init() {
		/* Events */
		const eventFiles = fs
			.readdirSync('src/events')
			.filter((file) => file.endsWith('.ts'));
		for (const file of eventFiles) {
			const { event } = await import(`../events/${file}`);
			this.events.set(event.type, event);
			this.on(event.type, event.on.bind(null, this));
		}

		process.env.NODE_ENV == 'production'
			? this.login(process.env.TOKEN)
			: this.login(process.env.TEST_TOKEN);
	}
}
export default Asomataru;
