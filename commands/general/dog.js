module.exports = {
    name: "dog",
    aliases: ['doggo'],
    permissions: [],
    ownerOnly: false,
    enabled: true,
    cooldown: 0,
    exec: async (client, message, args) => {
        const Discord = require('discord.js');
        const randomPuppy = require('random-puppy');
        const subReddits = ["dogs", "dog", "doggos"]
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];
        const img = await randomPuppy(random);
    
        const embed = new Discord.MessageEmbed()
        .setImage (img)
        .setTitle (`**__Who is a good doggo!__**`)
        .setURL (`https://reddit.com/${random}`)
        .setFooter (`From r/${random}`)
    
        message.channel.send(embed);
        },
    };