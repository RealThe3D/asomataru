import {
	AutocompleteInteraction,
	ChatInputCommandInteraction,
	Collection,
	Events,
} from 'discord.js';
import { Event } from '@/interfaces/Event.ts';
import config from '../../config.json' with { type: 'json' };

// TODO: Object with perms
export const event: Event = {
	type: Events.InteractionCreate,
	once: false,
	on: async (
		client,
		interaction: ChatInputCommandInteraction | AutocompleteInteraction,
	) => {
		if (interaction.isChatInputCommand()) {
			const command = client.commands.get(interaction.commandName);

			if (!command) return;

			if (command.ownerOnly && !config.owners.includes(interaction.user.id)) {
				return interaction.reply({
					content: 'Only the bot owner can use this!',
					ephemeral: true,
				});
			}
			if (!client.cooldowns.has(command.name)) {
				client.cooldowns.set(command.name, new Collection());
			}
			const now = Date.now();
			const timestamps = client.cooldowns.get(command.name) as Collection<
				string,
				number
			>;
			const cooldownAmount = command.cooldown * 1000;
			if (timestamps?.has(interaction.user.id)) {
				const timeId = timestamps.get(interaction.user.id) as number;
				const expirationTime = timeId + cooldownAmount;
				const timeLeft = (expirationTime - now) / 1000;
				if (now < expirationTime && timeLeft < 60) {
					return await interaction.reply({
						content: `Please wait ${
							timeLeft.toFixed(
								1,
							)
						} seconds to use this command again.`,
						ephemeral: true,
					});
				} else if (now < expirationTime && timeLeft > 60) {
					return await interaction.reply({
						content: `Please wait ${
							(timeLeft / 60).toFixed(
								0,
							)
						} minutes to use this command again.`,
						ephemeral: true,
					});
				}
				timestamps.set(interaction.user.id, now);
				setTimeout(
					() => timestamps.delete(interaction.user.id),
					cooldownAmount,
				);
			} else {
				timestamps?.set(interaction.user.id, now);
			}
			try {
				await command.execute(client, interaction);
			} catch (e) {
				console.error(e);
				if (interaction.deferred || interaction.replied) {
					await interaction.followUp({
						content: 'An error had occurred',
						ephemeral: true,
					});
				} else {
					await interaction.reply({
						content: 'An error had occurred',
						ephemeral: true,
					});
				}
			}
		} else if (interaction.isAutocomplete()) {
			const command = client.commands.get(interaction.commandName);

			if (!command) {
				console.error(
					`No command matching ${interaction.commandName} was found.`,
				);
				return;
			}
			try {
				// @ts-expect-error this code will only run if there's an autocomplete in the command.
				await command.autocomplete(client, interaction);
			} catch (e) {
				console.error(e);
			}
		}
	},
};
