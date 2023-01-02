import {
	Collection,
	Events,
	CommandInteraction,
	ChatInputCommandInteraction,
	PermissionsBitField,
} from 'discord.js';
import { Event } from '../interfaces/Event';
import config from '../../config.json';
import ExtendedClient from '../structures/client';

// TODO: Object with perms
export const event: Event = {
	type: Events.InteractionCreate,
	on: async (
		client: ExtendedClient,
		interaction: ChatInputCommandInteraction
	) => {
		if (!interaction.isCommand()) return;

		const command = client.commands.get(interaction.commandName);
		const interactionPerms = interaction.member
			?.permissions as Readonly<PermissionsBitField>;
		if (!command) return;
		if (command.permissions && !interactionPerms.has(command.permissions)) {
			return interaction.reply({
				content: "You don't have the permissions to use this command.",
				ephemeral: true,
			});
		}
		if (!command.enabled) {
			return interaction.reply({
				content: 'This command is disabled.',
				ephemeral: true,
			});
		}
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
				return interaction.reply(
					`Please wait ${timeLeft.toFixed(
						1
					)} seconds to use this command again.`
				);
			} else if (now < expirationTime && timeLeft > 60) {
				return interaction.reply(
					`Please wait ${(timeLeft / 60).toFixed(
						0
					)} minutes to use this command again.`
				);
			}
			timestamps.set(interaction.user.id, now);
			setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
		} else {
			timestamps?.set(interaction.user.id, now);
		}
		try {
			await command.execute(client, interaction);
		} catch (e) {
			await interaction.reply({
				content: 'An error had occured',
				ephemeral: true,
			});
			console.log(e);
		}
	},
};
