module.exports = {
    name: 'credits',
    aliases: ['halloffame'],
    permissions: [],
    ownerOnly: false,
    enabled: true,
    cooldown: 0,
    exec: async (client, message, args) => {
        const Discord = require("discord.js");
        const credits = [
            "Davska#6229 - Pro smash player, true friend, and loves the Sinnoh region!",
            "Kandrina#1426 - Lovely woman from Austria, likes eating ribs!",
            "Akashic Bearer#2305 - A bot programmer who totally doesn't have a better bot then me.",
            "Mochi#7342 - Coolio person, loves to eat mochi.",
            "オルティナ#6718 aka Creation, worthy player and waifu!",
            "Incineroar#7934 - Fatal memer and pro smash player",
            "SteMi#6098 - Busy with schoolwork but can manage to tell me oyasumi \o/",
            "SirSailor#3528 - Loves Xenoblade and Fire Emblem!",
            "Daniel Diaz#7193 aka Monika - Luxembourg's flag looks like aquafresh.",
            "SpaceLives47#0463 aka Asomataru-Chan, the person this bot is named after! Subscribe to their Youtube, InfiniteTimeLapse!",
            "Mirjan#9930 - Fatal memer!"
        ]
        const creditsEmbed = new Discord.MessageEmbed()
            .setColor("FFFFFF")
            .setTitle(`A dedication to my friends!`)
            .setDescription(credits)     
        message.channel.send(creditsEmbed);
    },
};