import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed, MessageActionRow, MessageButton, CacheType, MessageComponentInteraction } from 'discord.js';
import { randomIndexOfArray } from '../../constants';
import { Command } from '../../interfaces/Command';

enum RPS {
	ROCK,
	PAPER,
	SCISSORS
}

export const command: Command = {
	name: 'rps',
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 15,
	usage: 'rps <react to message>',
	data: new SlashCommandBuilder().setName('rps').setDescription('Starts a game of rock-paper-scissors'),
	execute: async (client, interaction) => {
		const botSelections = [RPS.ROCK, RPS.PAPER, RPS.SCISSORS];
		const botSelection = randomIndexOfArray(botSelections);

		const buttons = new MessageActionRow()
			.addComponents(
				new MessageButton().setStyle('SECONDARY').setEmoji('🗿').setCustomId('rock'),
				new MessageButton().setStyle('SECONDARY').setEmoji('📃').setCustomId('paper'),
				new MessageButton().setStyle('SECONDARY').setEmoji('✂️').setCustomId('scissors')
			);
			
		const filter = (i: MessageComponentInteraction<CacheType>) => {
			return (
				(i.customId == 'rock' || i.customId == 'paper' || i.customId == 'scissors') && i.user.id == interaction.user.id
			);
		};

		const embed = new MessageEmbed()
			.setTitle('Rock Paper Scissors')
			.setColor('NOT_QUITE_BLACK');
	
		await interaction.reply({embeds: [embed], components: [buttons]});
		const collector = interaction.channel?.createMessageComponentCollector({filter, time: 12000});
		collector?.on('collect', async i => {
			await i.deferUpdate();

			switch(i.customId) {
				case 'rock':
					checkWinner(RPS.ROCK, botSelection);
					break;
				case 'paper':
					checkWinner(RPS.PAPER, botSelection);
					break;
				case 'scissors':
					checkWinner(RPS.SCISSORS, botSelection);
					break;
			}
			
			await i.editReply({embeds: [embed], components: [buttons]});
		});

		function checkWinner(user: RPS, enemy: RPS) {
			let msg = '';
			if(user == enemy) {
				// tie
				embed.setColor('GREY');
				msg = 'You\'ve tied with your opponent.';
			}
			else if(user < enemy) {
				// loss
				embed.setColor('RED');
				msg = 'You\'ve loss to your opponent...';
			}
			else if(user > enemy) {
				// win
				embed.setColor('GREEN');
				msg = 'You\'ve won against your opponent!';
			} 
			
			embed.setFields([
				{name: 'Your choice', value: `${choices(user)}`, inline: false},
				{name: 'Enemy choice', value: `${choices(enemy)}`, inline: false},
				{name: 'Result', value: `${msg}`, inline: false}
			]);
		}

		function choices(choice: RPS): string {
			let _choice = '';
			switch(choice) {
				case RPS.ROCK:
					_choice = '🪨';
					break;
				case RPS.PAPER:
					_choice = '📃';
					break;
				case RPS.SCISSORS: 
					_choice = '✂️';
					break;
			}
			return _choice;
		}

	},
};
