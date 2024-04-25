import { Client, Collection, GatewayIntentBits, Snowflake } from 'discord.js';
import fs from 'fs';
import { Command } from '../interfaces/Command';
import { config } from 'dotenv';
config();

class Asomataru extends Client {
	commands: Collection<string, Command> = new Collection();
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

			if (event.once) {
				this.once(event.type, (...args) => event.on(this, ...args));
			} else {
				this.on(event.type, (...args) => event.on(this, ...args));
			}
		}

		process.env.NODE_ENV == 'production'
			? this.login(process.env.TOKEN)
			: this.login(process.env.TEST_TOKEN);
	}
}
export default Asomataru;
