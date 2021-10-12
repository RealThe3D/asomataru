import Client from '../client/client';
import { ClientEvents } from 'discord.js';

export interface Event {
	name: keyof ClientEvents;
	on: (client: Client, ...args: any[]) => void;
}
