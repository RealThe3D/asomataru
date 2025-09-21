import type { Events } from 'discord.js';
import type Asomataru from '@/structures/client.ts';

export interface Event {
	type: Events;
	once: boolean;
	// TODO: Define type for args.
	on: (client: Asomataru, ...args: never) => void;
}
