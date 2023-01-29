import type {
	CommandInteraction,
	SlashCommandBuilder,
	ChatInputCommandInteraction,
} from 'discord.js';
import ExtendedClient from '../structures/client';

type Interactions = ChatInputCommandInteraction;
export interface Command {
	name: string;
	ownerOnly: boolean;
	cooldown: number;
	usage: string;
	data:
		| SlashCommandBuilder
		| Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;

	execute: (
		client: ExtendedClient,
		interaction: ChatInputCommandInteraction
	) => void;
}
