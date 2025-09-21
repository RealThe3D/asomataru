import type {
	AutocompleteInteraction,
	ChatInputCommandInteraction,
	// SlashCommandBuilder,
	SlashCommandOptionsOnlyBuilder,
} from 'discord.js';
import type Asomataru from '@/structures/client.ts';

export interface Command {
	name: string;
	ownerOnly: boolean;
	cooldown: number;
	usage: string;
	data: // | SlashCommandBuilder
		// | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>
		SlashCommandOptionsOnlyBuilder;

	execute: (
		client: Asomataru,
		interaction: ChatInputCommandInteraction,
	) => void;
	autocomplete?: (
		client: Asomataru,
		interaction: AutocompleteInteraction,
	) => void;
}
