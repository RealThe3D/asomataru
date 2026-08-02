import type {
	AutocompleteInteraction,
	ChatInputCommandInteraction,
	SlashCommandBuilder,
	SlashCommandOptionsOnlyBuilder,
	SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";
import type Asomataru from "@/structures/client.ts";

export interface Command {
	name: string;
	module?: string;
	ownerOnly: boolean;
	cooldown: number;
	usage: string;
	data:
		| SlashCommandBuilder
		| SlashCommandOptionsOnlyBuilder
		| SlashCommandSubcommandsOnlyBuilder;

	execute: (
		client: Asomataru,
		interaction: ChatInputCommandInteraction,
	) => void;
	autocomplete?: (
		client: Asomataru,
		interaction: AutocompleteInteraction,
	) => void;
}
