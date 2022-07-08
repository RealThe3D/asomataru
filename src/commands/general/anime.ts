import { Command } from '../../interfaces/Command';
import { MessageEmbed, MessageActionRow, MessageButton, CacheType, MessageComponentInteraction } from 'discord.js';
import axios from 'axios';
import { SlashCommandBuilder } from '@discordjs/builders';

export const command: Command = {
	name: 'anime',
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 70,
	usage: 'anime',
	data: new SlashCommandBuilder().setName('anime').setDescription('Get information about an anime')
		.addStringOption(option => option.setName('title').setDescription('Anime to get info on.').setRequired(true)),
	execute: async (client, interaction) => {
		const buttons = new MessageActionRow()
			.addComponents(new MessageButton().setCustomId('backwards').setLabel('Previous').setStyle('SECONDARY'))
			.addComponents(new MessageButton().setCustomId('stop').setLabel('Stop').setStyle('SECONDARY'))
			.addComponents(new MessageButton().setCustomId('forward').setLabel('Next').setStyle('SECONDARY'));

		const filter = (i: MessageComponentInteraction<CacheType>) => {
			return (
				(i.customId == 'backwards' || i.customId == 'stop' || i.customId == 'forward') && i.user.id == interaction.user?.id
			);
		};
		const collector = interaction.channel?.createMessageComponentCollector({ filter, time: 60000 });

		let pageNum = 0;
		let anime = interaction.options.getString('title') as string;
		anime = anime.replaceAll(/ /g, '%20');
		const { data } = await axios.get(`https://kitsu.io/api/edge/anime?filter[text]=${anime}`);
		let animeData = data.data[pageNum];

		if(!animeData) {
			return await interaction.reply('That anime doesn\'t exists. Perhaps you misspelled it?');
		}
		const embed = new MessageEmbed()
		.setTitle(animeData.attributes.canonicalTitle)
		.setThumbnail(animeData.attributes.posterImage.tiny)
		.setColor('RANDOM')
		.setFields([
			{name: 'Synopsis', value: shorten(animeData.attributes.synopsis), inline: false},
			{name: 'Rating', value: `${animeData.attributes.averageRating} / 100`, inline: false},
			{name: 'Air Date', value: animeData.attributes.startDate, inline: false},
			{name: 'Episode Info', value: animeData.attributes.episodeCount + ' episodes, ' + animeData.attributes.episodeLength + ' minutes each', inline: false},
		]);

		await interaction.reply({embeds: [embed], components: [buttons]});
		collector?.on('collect', async(i) => {
			await i.deferUpdate();

			switch(i.customId) {
				case 'backwards':
					if(pageNum != 0) {
						pageNum--;
					}
					animeData = data.data[pageNum];
					embed.setTitle(animeData.attributes.canonicalTitle)
					.setThumbnail(animeData.attributes.posterImage.tiny)
					.setColor('RANDOM')
					.setFields([
						{name: 'Synopsis', value: shorten(animeData.attributes.synopsis), inline: false},
						{name: 'Rating', value: `${animeData.attributes.averageRating} / 100`, inline: false},
						{name: 'Air Date', value: animeData.attributes.startDate, inline: false},
						{name: 'Episode Info', value: animeData.attributes.episodeCount + ' episodes, ' + animeData.attributes.episodeLength + ' minutes each', inline: false},
					]);
					break;
				case 'stop':
					collector.dispose(i);
					buttons.spliceComponents(0, 3);
					buttons.addComponents(new MessageButton().setCustomId('finished').setEmoji('👍').setStyle('SUCCESS').setDisabled(true));
					break;
				case 'forward':
					// if(pageNum != 5) {
					// 	pageNum++;
					// }
					animeData = data.data[pageNum];
					if(!animeData) {
						pageNum--;
						animeData = data.data[pageNum];
						buttons.spliceComponents(2, 1);
					} else {
						pageNum++;
					}
					embed.setTitle(animeData.attributes.canonicalTitle)
					.setThumbnail(animeData.attributes.posterImage.tiny)
					.setColor('RANDOM')
					.setFields([
						{name: 'Synopsis', value: shorten(animeData.attributes.synopsis), inline: false},
						{name: 'Rating', value: `${animeData.attributes.averageRating} / 100`, inline: false},
						{name: 'Air Date', value: animeData.attributes.startDate, inline: false},
						{name: 'Episode Info', value: animeData.attributes.episodeCount + ' episodes, ' + animeData.attributes.episodeLength + ' minutes each', inline: false},
					]);
					
					break;
			}

			await i.editReply({embeds: [embed], components: [buttons]});
		});
		collector?.on('end', async() => {
				buttons.spliceComponents(0, 3);
		});
		function shorten(text: string): string {
			if(text.length > 550) {
				return text.slice(0, 550) + '...';
			} else {
				return text;
			}
		}
	},
};
