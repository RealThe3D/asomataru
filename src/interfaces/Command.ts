import type { Message, PermissionResolvable } from 'discord.js';
import Client from '../client/client';

export interface Command {
	name: string;
	aliases: string[];
	permissions: PermissionResolvable[];
	ownerOnly: boolean;
	enabled: boolean;
	cooldown: number;
	usage: string;
	execute: (client: Client, message: Message, args?: string[]) => void;
}
