module.exports = {
	name: 'topic',
	aliases: [],
	permissions: [],
	ownerOnly: false,
	enabled: true,
	cooldown: 0,
	exec: async (client, message, args) => {
		var options = [
			'What is something you are obsessed with?',
			'What would be your perfect weekend?',
			'What’s your favorite number? Why?',
			'What are you going to do this weekend?',
			'What’s the most useful thing you own?',
			'What’s your favorite way to waste time?',
			'How do your values differ from others?',
			'What do you think about 2021 so far?',
			'What is your routine for an average weekday?',
			'What happened in the funniest YouTube video you’ve seen?',
			'What’s the story behind how you met your best friend?',
			'What would your perfect house look like?',
			'Anime sub or Anime dub?',
			'Opinion on GrubHub Ad?',
		];
		var response = options[Math.floor(Math.random() * options.length)];
		message.channel.send(response).then().catch(console.error);
	},
};
