import { Client, Collection, Intents, Snowflake } from 'discord.js';
import fs from 'fs';
import mongoose from 'mongoose';
import { Command } from '../interfaces/Command';
import { Event } from '../interfaces/Event';
import { config } from 'dotenv';
config();

class ExtendedClient extends Client {
	public commands: Collection<string, Command> = new Collection();
	public events: Collection<string, Event<never>> = new Collection();
	public cooldowns: Collection<string, Collection<Snowflake, number>> = new Collection();

	constructor(
		intents = [
			Intents.FLAGS.GUILDS,
			Intents.FLAGS.GUILD_MESSAGES,
			Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		]
	) {
		super({ intents });
	}
	public async init(): Promise<void> {
		/* DB */
		// Needed for DB migration.
		const mongoDbUri = process.env.MONGODB_URI ?? '';
		await mongoose.connect(mongoDbUri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		/* Events */
		const eventFiles = fs
			.readdirSync('src/events')
			.filter((file) => file.endsWith('.ts'));
		for (const file of eventFiles) {
			const { event } = await import(`../events/${file}`);
			this.events.set(event.name, event);
			this.on(event.name, event.on.bind(null, this));
		}

		if(process.env.NODE_ENV == 'production') {
			this.login(process.env.TOKEN);
		} else {
			this.login(process.env.TEST_TOKEN);
		}
	}
}
export default ExtendedClient;
