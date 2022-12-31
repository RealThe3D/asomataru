import type {
	CommandInteraction,
	PermissionResolvable,
	SlashCommandBuilder,
	ChatInputCommandInteraction,
} from 'discord.js';
import ExtendedClient from '../structures/client';

export interface Command {
	name: string;
	permissions: PermissionResolvable[];
	ownerOnly: boolean;
	enabled: boolean;
	cooldown: number;
	usage: string;
	data:
		| SlashCommandBuilder
		| Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;

	execute: (
		client: ExtendedClient,
		interaction: ChatInputCommandInteraction
	) => void | Promise<void>;
}
