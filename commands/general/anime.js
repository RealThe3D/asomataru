module.exports = {
    name: "anime",
    aliases: ['animegirl','animegirls','ag','kawaii'],
    permissions: [],
    ownerOnly: false,
    enabled: true,
    cooldown: 0,
    exec: async (client, message, args) => {
        const randomPuppy = require('random-puppy');
        const Discord = require('discord.js');
        const subReddits = ["awwnime"]
        //const random = subReddits[Math.floor(Math.random() * subReddits.length)];
        const img = await randomPuppy(subReddits);
    
        const embed = new Discord.MessageEmbed()
        .setImage (img)
        .setTitle (`**__This command is much better than Aka's!__**`)
        .setURL (`https://reddit.com/${random}`)
        .setFooter (`From r/${random}`)
    
        message.channel.send(embed);
        },
};
