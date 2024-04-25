import type {
	ChatInputCommandInteraction,
	SlashCommandBuilder,
} from 'discord.js';
import Asomataru from '../structures/client';

export interface Command {
	name: string;
	ownerOnly: boolean;
	cooldown: number;
	usage: string;
	data:
		| SlashCommandBuilder
		| Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;

	execute: (
		client: Asomataru,
		interaction: ChatInputCommandInteraction
	) => void;
}
