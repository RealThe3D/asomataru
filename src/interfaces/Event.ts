import Client from '../structures/client';
import { Events } from 'discord.js';

export interface Event {
	type?: Events;
	// Define type for args.
	on: (...args: any) => void;
}
