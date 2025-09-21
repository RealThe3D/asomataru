import fs from "node:fs";
import {
	Client,
	Collection,
	GatewayIntentBits,
	type Snowflake,
} from "discord.js";
import type { Command } from "@/interfaces/Command.ts";
import "@std/dotenv/load";

class Asomataru extends Client {
	commands = new Collection<string, Command>();
	cooldowns = new Collection<string, Collection<Snowflake, number>>();

	constructor(intents = [GatewayIntentBits.Guilds]) {
		super({ intents });
	}
	async init() {
		/* Events */
		const eventFiles = fs
			.readdirSync("src/events")
			.filter((file: string) => file.endsWith(".ts"));
		for (const file of eventFiles) {
			const { event } = await import(`../events/${file}`);

			if (event.once) {
				this.once(event.type, (...args) => event.on(this, ...args));
			} else {
				this.on(event.type, (...args) => event.on(this, ...args));
			}
		}

		if (Deno.env.get("NODE_ENV") === "production") {
			this.login(Deno.env.get("TOKEN"));
		} else {
			this.login(Deno.env.get("TEST_TOKEN"));
		}
	}
}
export default Asomataru;
