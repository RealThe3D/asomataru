const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'topic',
	aliases: [],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	usage: 'topic',
	exec: async (client, message, args) => {
		const embed = new MessageEmbed().setTitle('Topic!');

		const options = [
			'What is something you are obsessed with?',
			'What would be your perfect weekend?',
			"What's your favorite number? Why?",
			'What are you going to do this weekend?',
			"What's the most useful thing you own?",
			"What's your favorite way to waste time?",
			"What's your favorite holiday?",
			'What do you think about 2021 so far?',
			'What is your routine for an average weekday?',
			'What happened in the funniest YouTube video you’ve seen?',
			"What's the story behind how you met your best friend?",
			'What would your perfect house look like?',
			'Anime sub or Anime dub?',
			"What's a superpower you wish to have?",
		];
		const response = options[Math.floor(Math.random() * options.length)];
		embed.addField('TOPIC:', response, true);
		message.channel.send(embed);
	},
};
