import { Events } from 'discord.js';
import Asomataru from '../structures/client';

export interface Event {
	type: Events;
	// Define type for args.
	on: (client: Asomataru, ...args: any) => void;
}
