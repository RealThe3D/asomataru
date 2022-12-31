import Client from '../structures/client';
import { Events } from 'discord.js';

export interface Event<T> {
	type?: Events;
	on: (client: Client, ...args: T[]) => void;
}
