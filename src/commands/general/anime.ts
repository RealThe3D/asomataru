import { Command } from '../../interfaces/Command';
import {
	SlashCommandBuilder,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	MessageComponentInteraction,
	ButtonStyle,
	Colors,
	ComponentType,
} from 'discord.js';
import axios from 'axios';

export const command: Command = {
	name: 'anime',
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 70,
	usage: 'anime',
	data: new SlashCommandBuilder()
		.setName('anime')
		.setDescription('Get information about an anime')
		.addStringOption((option) =>
			option
				.setName('title')
				.setDescription('Anime to get info on.')
				.setRequired(true)
		),
	execute: async (client, interaction) => {
		const buttons = new ActionRowBuilder<ButtonBuilder>()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('backwards')
					.setLabel('Previous')
					.setStyle(ButtonStyle.Secondary)
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId('stop')
					.setLabel('Stop')
					.setStyle(ButtonStyle.Secondary)
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId('forward')
					.setLabel('Next')
					.setStyle(ButtonStyle.Secondary)
			);
		const filter = (i: MessageComponentInteraction) => {
			return (
				(i.customId == 'backwards' ||
					i.customId == 'stop' ||
					i.customId == 'forward') &&
				i.user.id == interaction.user?.id
			);
		};
		const collector = interaction.channel?.createMessageComponentCollector({
			filter,
			time: 60000,
			componentType: ComponentType.Button,
		});
		let pageNum = 0;
		let anime = interaction.options.getString('title') as string;
		anime = anime.replaceAll(/ /g, '%20');
		const { data } = await axios.get(
			`https://kitsu.io/api/edge/anime?filter[text]=${anime}`
		);
		let animeData = data.data[pageNum];
		if (!animeData)
			return await interaction.reply(
				"That anime doesn't exists. Perhaps you misspelled it?"
			);

		const embed = new EmbedBuilder()
			.setTitle(animeData.attributes.canonicalTitle)
			.setThumbnail(animeData.attributes.posterImage.tiny)
			.setColor(Colors.Aqua)
			.setFields([
				{
					name: 'Synopsis',
					value: shorten(animeData.attributes.synopsis),
					inline: false,
				},
				{
					name: 'Rating',
					value: `${animeData.attributes.averageRating} / 100`,
					inline: false,
				},
				{
					name: 'Air Date',
					value: animeData.attributes.startDate,
					inline: false,
				},
				{
					name: 'Episode Info',
					value:
						animeData.attributes.episodeCount +
						' episodes, ' +
						animeData.attributes.episodeLength +
						' minutes each',
					inline: false,
				},
			]);
		await interaction.reply({ embeds: [embed], components: [buttons] });
		collector?.on('collect', async (i) => {
			await i.deferUpdate();
			switch (i.customId) {
				case 'backwards':
					if (pageNum != 0) {
						pageNum--;
					}
					animeData = data.data[pageNum];
					embed
						.setTitle(animeData.attributes.canonicalTitle)
						.setThumbnail(animeData.attributes.posterImage.tiny)
						.setColor(Colors.LuminousVividPink)
						.setFields([
							{
								name: 'Synopsis',
								value: shorten(animeData.attributes.synopsis),
								inline: false,
							},
							{
								name: 'Rating',
								value: `${animeData.attributes.averageRating} / 100`,
								inline: false,
							},
							{
								name: 'Air Date',
								value: animeData.attributes.startDate,
								inline: false,
							},
							{
								name: 'Episode Info',
								value:
									animeData.attributes.episodeCount +
									' episodes, ' +
									animeData.attributes.episodeLength +
									' minutes each',
								inline: false,
							},
						]);
					break;
				case 'stop':
					collector.dispose(i);
					buttons.components.splice(0, 3);
					// buttons.spliceComponents(0, 3);
					buttons.addComponents(
						new ButtonBuilder()
							.setCustomId('finished')
							.setEmoji('👍')
							.setStyle(ButtonStyle.Success)
							.setDisabled(true)
					);
					break;
				case 'forward':
					// if(pageNum != 5) {
					// 	pageNum++;
					// }
					animeData = data.data[pageNum];
					if (!animeData) {
						pageNum--;
						animeData = data.data[pageNum];
						buttons.components.splice(2, 1);
					} else {
						pageNum++;
					}
					embed
						.setTitle(animeData.attributes.canonicalTitle)
						.setThumbnail(animeData.attributes.posterImage.tiny)
						.setColor(Colors.LuminousVividPink)
						.setFields([
							{
								name: 'Synopsis',
								value: shorten(animeData.attributes.synopsis),
								inline: false,
							},
							{
								name: 'Rating',
								value: `${animeData.attributes.averageRating} / 100`,
								inline: false,
							},
							{
								name: 'Air Date',
								value: animeData.attributes.startDate,
								inline: false,
							},
							{
								name: 'Episode Info',
								value:
									animeData.attributes.episodeCount +
									' episodes, ' +
									animeData.attributes.episodeLength +
									' minutes each',
								inline: false,
							},
						]);
					break;
			}
			await i.editReply({ embeds: [embed], components: [buttons] });
		});
		collector?.on('end', async () => {
			buttons.components.splice(0, 3);
		});
		function shorten(text: string): string {
			if (text.length > 550) {
				return text.slice(0, 550) + '...';
			} else {
				return text;
			}
		}
	},
};
