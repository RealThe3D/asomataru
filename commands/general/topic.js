module.exports = {
    name: 'topic',
    aliases: [],
    permissions: [],
    ownerOnly: false,
    enabled: true,
    cooldown: 0,
    exec: async (client, message, args) => {
        var options = [
            "Holidays. What were your favorite holidays when you were a child?",
            "What was the last funny video you saw?",
            "What do you do to get rid of stress?",
            "What is something you are obsessed with?",
            "What three words best describe you?",
            "What would be your perfect weekend?", //5
            "What’s your favorite number? Why?",
            "What are you going to do this weekend?",
            "What’s the most useful thing you own?",
            "What’s your favorite way to waste time?",
            "What do you think of tattoos? Do you have any?", //10
            "What was your worst travel experience?",
            "How important do you think self-improvement is?",
            "What is a good life?",
            "What was the most important chance encounter you’ve had?",
            "What was the scariest dream you’ve had?", //15
            "What is a bad life?",
            "What valuable lessons should we learn from history?",
            "How do your values differ from others?",
            "What do you think about 2020 so far?",
            "What is your routine for an average weekday?", //20
            "What happened in the funniest YouTube video you’ve seen?",
            "What’s the story behind how you met your best friend?",
            "What would your perfect house look like?",
            "What’s the worst work mistake you’ve made?",
            "Anime sub or Anime dub?" //25
        ];
        var response = options[Math.floor(Math.random() * options.length)];
        message.channel.send(response).then().catch(console.error);
    },
}