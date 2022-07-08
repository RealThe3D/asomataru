import Client from '../structures/client';
import type { ClientEvents } from 'discord.js';

export interface Event<T> {
	name: keyof ClientEvents;
	on: (client: Client, ...args: T[]) => void;
}
