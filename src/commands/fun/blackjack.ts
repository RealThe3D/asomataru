import { CacheType, MessageActionRow, MessageButton, MessageComponentInteraction, MessageEmbed } from 'discord.js';
import { Command } from '../../interfaces/Command';
import { random } from '../../constants';
import { SlashCommandBuilder } from '@discordjs/builders';
import prisma from '../../structures/prisma';
import { Blackjack, Prisma, User } from '@prisma/client';

type dbUser = User & {
    blackjack: Blackjack | null;
}

export const command: Command = {
	name: 'blackjack',
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 40,
	usage: '<bet | hit | stand> <amount>',
	data: new SlashCommandBuilder()
		.setName('blackjack')
		.setDescription('play blackjack')
		.addNumberOption(option => option.setName('bet').setDescription('Betting amount').setMinValue(100).setRequired(true)),
	execute: async (client, interaction) => {
		
		const betAmount = interaction.options.getNumber('bet') as number;
		const buttons = new MessageActionRow()
			.addComponents(new MessageButton().setCustomId('hit').setLabel('Hit').setStyle('PRIMARY'))
			.addComponents(new MessageButton().setCustomId('stand').setLabel('Stand').setStyle('PRIMARY'))
			.addComponents(new MessageButton().setCustomId('forfeit').setLabel('Forfeit').setStyle('DANGER'));

		const filter = (i: MessageComponentInteraction<CacheType>) => {
			return (
				(i.customId == 'hit' || i.customId == 'forfeit' || i.customId == 'stand') && i.user.id == interaction.user?.id
			);
		};

		const userAmount = await prisma.user.findUnique({
			where: {
				userId: interaction.user.id
			},
			select: {
				coins: true
			},
			rejectOnNotFound: true
		});

		if(betAmount > userAmount.coins) {
			return interaction.reply({ content: 'You cannot bet more coins than what you have!', ephemeral: true });
		}
		const collector = interaction.channel?.createMessageComponentCollector({ filter, time: 30000 });

		const embed = new MessageEmbed()
			.setTitle('Blackjack')
			.setColor('DARK_GREEN')
			.addField('Bet amount: ', `${betAmount}`, false);
		
		await interaction.reply({ embeds: [embed], components: [buttons] });

		let user: dbUser;
		let userValue: number;
		let userEnemyValue: number;
		
		collector?.on('collect', async (i) => {
			await i.deferUpdate();
			
			switch(i.customId) {	
				case 'hit':
					user = await updateUser(interaction.user.id, {
						blackjack: {
							update: {
								value: {
									increment: random(1, 10)
								},
								enemyValue: {
									increment: random(1, 10)
								},
							}
						}
					});


					userValue = user.blackjack?.value as number;
					userEnemyValue = user.blackjack?.enemyValue as number;

					embed.setFields(
						{name: 'Your stand', value: `${user?.blackjack?.value}`, inline: false},
						{name: 'Enemy\'s stand', value: `${user?.blackjack?.enemyValue}`, inline: false}
					);

					if ((userValue >= 21 && userEnemyValue >= 21) && userValue == userEnemyValue) {
						// draw
						user = await updateUser(interaction.user.id, {
							blackjack: {
								update: {
									value: 0,
									enemyValue: 0,
									betAmount: 0
								}
							}
						});
						embed.setColor('GREY');
						embed.addField('You\'ve drawed with your opponent.', `Your bet was refunded. You now have ${user.coins} coins.`, false);
					}

					else if((userEnemyValue == 21) || userValue > 21 && (userValue >= userEnemyValue)) {
						// loss
						user = await updateUser(interaction.user.id, {
							coins: {
								decrement: betAmount
							},
							blackjack: {
								update: {
									value: 0,
									enemyValue: 0,
									betAmount: 0
								}
							}
						});
						embed.setColor('RED');
						embed.addField('You\'ve lost', `${betAmount} coins was deducted from your account. You now have ${user.coins} coins.`, false);
					} else if ((userValue == 21) || userEnemyValue > 21 && (userValue <= userEnemyValue)) {
						// win
						user = await updateUser(interaction.user.id, {
							coins: {
								increment: betAmount
							},
							blackjack: {
								update: {
									value: 0,
									enemyValue: 0,
									betAmount: 0
								}
							}
						});
					
						embed.setColor('GREEN');
						embed.addField('You\'ve won!', `${betAmount} coins was added to your account. You now have ${user.coins} coins.`, false);
					}
					break;
				case 'stand':
					while((user?.blackjack?.enemyValue) as number < 17) {
						user = await updateUser(interaction.user.id, {
							blackjack: {
								update: {
									enemyValue: {
										increment: random(1, 10)
									}
								}
							}
						});
					}
					userValue = user.blackjack?.value as number;
					userEnemyValue = user.blackjack?.enemyValue as number;

					embed.setFields(
						{name: 'Your stand', value: `${user?.blackjack?.value}`, inline: false},
						{name: 'Enemy\'s stand', value: `${user?.blackjack?.enemyValue}`, inline: false}
					);

					await checkResult();
					break;
				case 'forfeit': 
						user = await updateUser(interaction.user.id, {
								blackjack: {
									update: {
										betAmount: 0,
										enemyValue: 0,
										value: 0
									}
								}
							}
						);
						embed.setColor('RED');
						embed.setFields({name: 'GAME OVER', value: 'Forfeit', inline: true});
						break;
				}

				await i.editReply({embeds: [embed], components: [buttons] });
			});
		
		async function updateUser(id: string, data: Prisma.UserUpdateInput) {
			const user = await prisma.user.update({
				where: {
					userId: id,
				},
				include: {
					blackjack: true
				},
				data: data
			});
			return user;
		}

		async function checkResult() {
			userValue = user.blackjack?.value as number;
			userEnemyValue = user.blackjack?.enemyValue as number;
			
			const playerDistance = userValue - 21;
			const enemyDistance = userEnemyValue - 21;
			
			if (playerDistance == enemyDistance) {
				// draw
				await updateUser(interaction.user.id, {
					blackjack: {
						update: {
							value: 0,
							enemyValue: 0,
							betAmount: 0
						}
					}
				});

				embed.setColor('GREY');
				embed.addField('You\'ve drawed.', `Your bet was refunded. You now have ${user.coins} coins.`, false);
				console.log('draw');
			}

			else if(enemyDistance > playerDistance) {
				// loss
				await updateUser(interaction.user.id, {
					coins: {
						decrement: betAmount
					},
					blackjack: {
						update: {
							value: 0,
							enemyValue: 0,
							betAmount: 0
						}
					}
				});

				embed.setColor('RED');
				embed.addField('You\'ve lost', `${betAmount} coins was deducted from your account. You now have ${user.coins} coins.`, false);
			} else if (enemyDistance < playerDistance) {
				// win
				await updateUser(interaction.user.id, {
					coins: {
						increment: betAmount
					},
					blackjack: {
						update: {
							value: 0,
							enemyValue: 0,
							betAmount: 0
						}
					}
				});


				embed.setColor('GREEN');
				embed.addField('You\'ve won!', `${betAmount} coins was added to your account. You now have ${user.coins} coins.`, false);
			}
		}
	},
};
