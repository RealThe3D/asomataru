import { Client, Collection, GatewayIntentBits, Snowflake } from 'discord.js';
import fs from 'fs';
import { Command } from '../interfaces/Command';

class Asomataru extends Client {
	commands = new Collection<string, Command>();
	cooldowns = new Collection<string, Collection<Snowflake, number>>();

	constructor(intents = [GatewayIntentBits.Guilds]) {
		super({ intents });
	}
	async init() {
		/* Events */
		const eventFiles = fs
			.readdirSync('src/events')
			.filter((file) => file.endsWith('.ts'));
		for (const file of eventFiles) {
			const { event } = await import(`../events/${file}`);

			if (event.once) {
				this.once(event.type, (...args) => event.on(this, ...args));
			} else {
				this.on(event.type, (...args) => event.on(this, ...args));
			}
		}

		if (process.env.NODE_ENV == 'production') {
			this.login(process.env.TOKEN);
		} else {
			this.login(process.env.TEST_TOKEN);
		}
	}
}
export default Asomataru;
