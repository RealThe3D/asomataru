module.exports = {
    name: 'moemorphism',
    aliases: ['moe'],
    permissions: [],
    ownerOnly: false,
    enabled: true,
    cooldown: 0,
    exec: async (client, message, args) => {
        const Discord = require('discord.js');
        const randomPuppy = require('random-puppy');
        const subReddits = ["moemorphism"]
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];
        const img = await randomPuppy(random);
    
        const embed = new Discord.MessageEmbed()
        .setImage (img)
        .setTitle (`**__Moemorphism__**`)
        .setURL (`https://reddit.com/${random}`)
        .setFooter (`From r/${random}`)
    
        message.channel.send(embed);
        },
    };