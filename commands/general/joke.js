module.exports = {
    name: 'joke',
    aliases: [],
    permissions: [],
    ownerOnly: false,
    enabled: true,
    cooldown: 0,
    exec: async (client, message, args) => {
        var jokes = [
            "I ate a clock yesterday, it was very time-consuming.",
            "A perfectionist walked into a bar...apparently, the bar wasn’t set high enough.",
            "Did you hear about the crook who stole a calendar? He got twelve months.",
            "What's the difference between ignorance and apathy\n\n||I don’t know and I don’t care.||",
            "Why are frogs so happy?, because whatever bugs them", //5
            "Never criticize someone until you've walked a mile in their shoes. That way, when you criticize them, they won't be able to hear you from that far away. Plus, you'll have their shoes.",
            "I own the world's worst thesaurus. Not only is it awful, it's awful.",
            "Velcro—what a rip-off!",
            "Don't you hate it when someone answers their own questions? I do.",
            "If we shouldn’t eat at night, why do they put a light in the fridge?", //10
            "I can’t believe I got fired from the calendar factory: all I did was take a day off!",
            "I went to see the doctor about my short-term memory problems — the first thing he did was make me pay in advance.",
            "You have two parts of the brain, “left” and “right” — in the left side, there’s nothing right and in the right side, there’s nothing left.",
            "Why do bees hum? They don’t remember the lyrics!",
            "I have a dog to provide me with unconditional love but I also have a cat to remind me that I don’t deserve it: it’s all about balance.", //15
            "Don’t spell part backwards. It’s a trap.",
            "Today a man knocked on my door and asked for a small donation towards the local swimming pool. I gave him a glass of water.",
            "Most people are shocked when they find out how bad I am as an electrician.",
            "Moses had the first tablet that could connect to the cloud.", //20
            "Don’t trust atoms, they make up everything.",
            "Thanks for explaining the word “many” to me, it means a lot.",
            "I hope when I inevitably choke to death on gummy bears people just say I was killed by bears and leave it at that.",
            "I’m reading a book about anti-gravity. It’s impossible to put down.",
            "R.I.P boiled water. You will be mist." //25
        ]
        var response = jokes[Math.floor(Math.random() * jokes.length)];
        message.channel.send(response).then().catch(console.error);
        },
    }