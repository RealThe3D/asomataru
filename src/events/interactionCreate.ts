import { Collection, Interaction, Permissions } from 'discord.js';
import { Event } from '../interfaces/Event';
import { modelSchema as Guild } from '../models/guildModel';
import { modelSchema as User } from '../models/userModel';
import config from '../../config.json';
import prisma from '../structures/prisma';
// import { Command } from '../interfaces/Command';

// TODO: Object with perms
export const event: Event<Interaction> = {
	name: 'interactionCreate',
	on: async (client, interaction: Interaction) => {

		// DB Migration for Prisma.
		const mongoUser = await User.findOne({userID: interaction.user.id});
		const mongoGuild = await Guild.findOne({guildID: interaction.guild?.id});

		const user = await prisma.user.findUnique({
			where: {
				userId: interaction.user.id
			}
		});
		const guild = await prisma.guild.findUnique({
			where: {
				guildId: interaction.guild?.id
			}
		});

		if(!user) {
			await prisma.user.create({
				data: {
					coins: mongoUser.coins || 0,
					affection: mongoUser.affection || 0,
					userId: interaction.user.id
				}
			});
		}
		if(!guild && interaction.inGuild()) {
			await prisma.guild.create({
				data: {
					guildId: mongoGuild.id || interaction.guild?.id
				}
			});
		}

		if(!interaction.isCommand()) return;

		const command = client.commands.get(interaction.commandName);
		const interactionPerms = interaction.member?.permissions as Readonly<Permissions>;
		if (!command) return;
		if (command.permissions && !interactionPerms.has(command.permissions)) {
			return interaction.reply(
				{content: 'You don\'t have the permissions to use this command.', ephemeral: true}
			);

		}
		if (!command.enabled) {
			return interaction.reply({ content: 'This command is disabled.', ephemeral: true});
		}
		if (command.ownerOnly && !config.owners.includes(interaction.user.id)) {
			return interaction.reply({content: 'Only the bot owner can use this!', ephemeral: true});
		}
		if (!client.cooldowns.has(command.name)) {
			client.cooldowns.set(command.name, new Collection());
		}
		const now = Date.now();
		const timestamps = client.cooldowns.get(command.name) as Collection<string, number>;
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
			await interaction.reply({content: 'An error had occured', ephemeral: true});
			console.log(e);
		}
		
	},
};
