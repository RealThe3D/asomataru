import { Events } from 'discord.js';
import Asomataru from '../structures/client';

export interface Event {
	type: Events;
	once: boolean;
	// TODO: Define type for args.
	on: (client: Asomataru, ...args: never) => void;
}
