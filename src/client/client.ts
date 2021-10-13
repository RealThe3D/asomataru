import { Client, Collection, Intents, Snowflake } from 'discord.js';
import fs from 'fs';
import mongoose, { Connection } from 'mongoose';
import { Command } from '../interfaces/Command';
import { Event } from '../interfaces/Event';
import { config } from 'dotenv';

//TODO: make this only run on dev
// config();
class ExtendedClient extends Client {
	public commands: Collection<string, Command> = new Collection();
	public events: Collection<string, Event> = new Collection();
	public cooldowns: Collection<string, Collection<Snowflake, number>> =
		new Collection();

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
		const db: Connection = mongoose.connection;
		const mongoDbUri = process.env.MONGODB_URI ?? '';
		mongoose.connect(mongoDbUri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		/* Commands */
		const commandFolders = fs.readdirSync('dist/src/commands');
		for (let folder of commandFolders) {
			const commandFiles = fs
				.readdirSync(`dist/src/commands/${folder}`)
				.filter((file) => file.endsWith('.js'));
			for (let file of commandFiles) {
				const { command } = await import(`../commands/${folder}/${file}`);
				command.module = folder;
				this.commands.set(command.name, command);
			}
		}

		/* Events */
		const eventFiles = fs
			.readdirSync('dist/src/events')
			.filter((file) => file.endsWith('.js'));
		for (let file of eventFiles) {
			const { event } = await import(`../events/${file}`);
			this.events.set(event.name, event);
			this.on(event.name, event.on.bind(null, this));
		}
		/* DB */
		db.on('error', (err) => {
			console.log(err);
		});

		this.login(process.env.TOKEN);
	}
}
export default ExtendedClient;
