import { Command } from '../../interfaces/Command';
import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export const command: Command = {
	name: 'topic',

	ownerOnly: false,

	cooldown: 0,
	usage: 'topic',
	data: new SlashCommandBuilder()
		.setName('topic')
		.setDescription('Starts up a topic to discuss'),
	execute: async (client, interaction) => {
		const embed = new EmbedBuilder().setTitle('Topic!');

		const options = [
			'What is something you are obsessed with?',
			'What would be your perfect weekend?',
			'Is a hot dog a sandwich?',
			'What are you going to do this weekend?',
			"What's the most useful thing you own?",
			"What's your favorite way to waste time?",
			"What's your favorite holiday?",
			'What do you think about 2024 so far?',
			'What is your routine for an average weekday?',
			"What happened in the funniest YouTube video you've seen?",
			"What's the story behind how you met your best friend?",
			'What would your perfect house look like?',
			'Anime sub or Anime dub?',
			"What's a superpower you wish to have?",
		];

		const response = options[Math.floor(Math.random() * options.length)];
		embed.setDescription(response);
		await interaction.reply({ embeds: [embed] });
	},
};
